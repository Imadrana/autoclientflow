import { 
  collection, addDoc, getDocs, getDoc, doc, 
  updateDoc, deleteDoc, query, where, orderBy 
} from 'firebase/firestore';
import { db, auth } from './firebase';

const COLLECTION_NAME = 'contacts';
const contactsCollection = collection(db, COLLECTION_NAME);

export const addContact = async (contact) => {
  const userId = auth.currentUser.uid;
  return await addDoc(contactsCollection, {
    ...contact,
    userId: userId,
    createdAt: new Date()
  });
};

export const getContacts = async () => {
  const userId = auth.currentUser.uid;
  const q = query(
    contactsCollection, 
    where("userId", "==", userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const getContact = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const data = snapshot.data();
    // Ensure user can only access their own data
    if (data.userId === auth.currentUser.uid) {
      return {
        id: snapshot.id,
        ...data
      };
    }
    return null;
  }
  return null;
};

export const updateContact = async (id, contact) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  // Get the document first to verify ownership
  const doc = await getDoc(docRef);
  if (doc.exists() && doc.data().userId === auth.currentUser.uid) {
    await updateDoc(docRef, contact);
    return {
      id,
      ...contact
    };
  }
  throw new Error("Not authorized to update this contact");
};

export const deleteContact = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  // Get the document first to verify ownership
  const doc = await getDoc(docRef);
  if (doc.exists() && doc.data().userId === auth.currentUser.uid) {
    await deleteDoc(docRef);
    return id;
  }
  throw new Error("Not authorized to delete this contact");
};