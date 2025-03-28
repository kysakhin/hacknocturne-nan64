import { db } from "@/lib/firebase";
import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";


export async function POST(req) {
  try {
    const body = await req.json();

    const { buyerId, product_details, seller_id } = body;

    const listingsRef = collection(db, "products");

    const docRef = await addDoc(listingsRef, {
      buyerId,
      product_details,
      seller_id,
      createdAt: new Date().toISOString()
    });

    const userRef = doc(db, "users", seller_id);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        listed_products: arrayUnion(docRef.id)
      });
    } else {
      await setDoc(userRef, {
        listed_products: [docRef.id],
      });
    }

    return Response.json({ message: "Listing added" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Failed to add listing" }, { status: 500 });
  }
}
