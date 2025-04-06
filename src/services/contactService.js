import { 
    collection, addDoc, getDocs, getDoc, doc, 
    updateDoc, deleteDoc, query, orderBy 
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  const COLLECTION_NAME = 'contacts';
  const contactsCollection = collection(db, COLLECTION_NAME);
  
  export const addContact = async (contact) => {
    return await addDoc(contactsCollection, {
      ...contact,
      createdAt: new Date()
    });
  };
  
  export const getContacts = async () => {
    const q = query(contactsCollection, orderBy('createdAt', 'desc'));
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
      return {
        id: snapshot.id,
        ...snapshot.data()
      };
    }
    return null;
  };
  
  export const updateContact = async (id, contact) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, contact);
    return {
      id,
      ...contact
    };
  };
  
  export const deleteContact = async (id) => {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return id;
  };