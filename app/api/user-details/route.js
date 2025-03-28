import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, fullName, phone, email } = body;

        if (!userId || !fullName || !phone || !email) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
        }

        const userRef = doc(db, "users", userId); // Set document ID as userId
        await setDoc(userRef, {
            fullName,
            phone,
            email,
            bartered_products: [],
            bought_products: [],
            listed_products: [],
            recycled_products: [],
            dashboard_stats: {
                total_earnings: 0,
                active_listings: 0,
                items_sold: 0,
                items_bought: 0,
                items_bartered: 0,
                items_recycled: 0,
            }
        });

        return new Response(JSON.stringify({ message: "Successfully created user" }), { status: 200 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new Response(JSON.stringify({ message: "Failed to create user" }), { status: 500 });
    }
}
