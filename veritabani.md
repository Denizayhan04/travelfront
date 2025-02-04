# travel-backend

veritabanı şeması 
{
  "users": [
    {
      "_id": ObjectId("..."),
      "username": string,
      "email": string,
      "passwordHash": string,
      "profilePicture": string,
      "backgroundImage": string,
      "bio": string,
      "location": string,
      "interests": [string],
      "travelStyle": string,
      "socialLinks": {
        "instagram": string,
        "twitter": string
      },
      "friends": [ObjectId],
      "friendRequests": [ObjectId],
      "sentRequests": [ObjectId],
      "savedTravelPlans": [ObjectId],
      "createdAt": ISODate,
      "updatedAt": ISODate,
      "posts": [ObjectId]
    }
  ],

  "travelPlans": [
    {
      "_id": ObjectId("..."),
      "userId": ObjectId("..."),
      "departureLocation": string,
      "destination": string,
      "startDate": ISODate,
      "endDate": ISODate,
      "budget": number,
      "status": string,  // "planned", "ongoing", "completed"
      "participants": [ObjectId],
      "createdAt": ISODate
    }
  ],

  "posts": [
    {
      "_id": ObjectId("..."),
      "userId": ObjectId("..."),
      "communityId": ObjectId,
      "content": string,  // Post içeriği
      "image": string,
      "taggedUsers": [ObjectId],  // Etiketlenen kullanıcılar
      "likes": [ObjectId],
      "comments": [
        {
          "userId": ObjectId("..."),
          "comment": string,
          "timestamp": ISODate
        }
      ],
      "createdAt": ISODate
    }
  ],

  "communities": [
    {
      "_id": ObjectId("..."),
      "name": string,
      "description": string,
      "creatorId": ObjectId,
      "members": [ObjectId],
      "posts": [ObjectId],
      "createdAt": ISODate
    }
  ],

  "groupChats": [
    {
      "_id": ObjectId("..."),
      "title": string,
      "members": [
        {
          "userId": ObjectId("..."),
          "role": string  // "leader", "moderator", "member"
        }
      ],
      "messages": [
        {
          "senderId": ObjectId("..."),
          "content": string,
          "timestamp": ISODate,
          "read": boolean
        }
      ],
      "createdAt": ISODate,
      "updatedAt": ISODate
    }
  ],

  "directMessages": [
    {
      "_id": ObjectId("..."),
      "senderId": ObjectId("..."),
      "receiverId": ObjectId("..."),
      "content": string,
      "timestamp": ISODate,
      "read": boolean
    }
  ],

  "notifications": [
    {
      "_id": ObjectId("..."),
      "userId": ObjectId("..."),
      "type": string,  // "message", "travel_request", "comment", vb.
      "content": string,  // Bildirim içeriği
      "relatedId": ObjectId,  // İlgili içerik (mesaj, seyahat planı, vb.)
      "status": string,  // "unread", "read"
      "timestamp": ISODate
    }
  ],

  "friendRequests": [
    {
      "_id": ObjectId("..."),
      "senderId": ObjectId("..."),
      "receiverId": ObjectId("..."),
      "status": string,  // "pending", "accepted", "rejected"
      "timestamp": ISODate
    }
  ]
}
