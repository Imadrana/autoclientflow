import Link from 'next/link';
import Card from '../ui/Card';

const ContactCard = ({ contact }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <Link href={`/contacts/${contact.id}`}>
        <div className="cursor-pointer">
          <h3 className="text-lg font-semibold">{contact.name}</h3>
          <p className="text-gray-600">{contact.company}</p>
          <p className="text-gray-500 text-sm mt-1">{contact.email}</p>
          <p className="text-gray-500 text-sm">{contact.phone}</p>
        </div>
      </Link>
    </Card>
  );
};

export default ContactCard;