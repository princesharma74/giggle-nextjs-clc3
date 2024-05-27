import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { leetcode_id: string } }) {
    try {
        const { email, uuid } = await req.json();
        
        // Define the GraphQL query and variables
        const query = `
            query userPublicProfile($username: String!) {
                matchedUser(username: $username) {
                    profile {
                        aboutMe
                    }
                }
            }
        `;
        const variables = { username: params.leetcode_id };
        
        // Execute the GraphQL query
        const response = await axios.post('https://leetcode.com/graphql/', {
            query: query,
            variables: variables
        });
        
        // Extract the aboutMe field from the response
        const aboutMe = response.data.data.matchedUser.profile.aboutMe;
        
        // Check if the UUID matches the aboutMe field
        const isVerified = uuid === aboutMe;
        
        // Update the user's verification status
        await axios.patch(`${process.env.BACKEND_API_URL}/api/users/${email}/update`, { leetcode: { verified: isVerified } });
        
        // Return the appropriate response
        return NextResponse.json({
            title: isVerified ? "Verification Successful" : "Verification Failed",
            description: isVerified ? "LeetCode user ID verified" : "Make sure you have added the verification code to your LeetCode profile"
        });
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            title: "Verification Failed",
            description: err.message
        }), { status: 500 });
    }
}
