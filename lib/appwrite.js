// import {
//   Account,
//   Avatars,
//   Client,
//   Databases,
//   ID,
//   Query,
//   Storage,
// } from "appwrite";

// export const appwriteConfig = {
//   endpoint: "https://cloud.appwrite.io/v1",
//   platform: "com.jsm.aora",
//   projectId: "67a0942a002f130479ce",
//   storageId: "67a09a37000ba0e077a7",
//   databaseId: "67a096a1003aa979384d",
//   userCollectionId: "67a0d16c001d1ea51843",
//   videoCollectionId: "67a0972e002ef20c0ab1",
// };

// const client = new Client();

// client
//   .setEndpoint(appwriteConfig.endpoint)
//   .setProject(appwriteConfig.projectId)
//   .setPlatform(appwriteConfig.platform);

// const account = new Account(client);
// const storage = new Storage(client);
// const avatars = new Avatars(client);
// const databases = new Databases(client);
import {
  Client,
  Account,
  Avatars,
  Databases,
  ID,
  Query,
  Storage,
} from "appwrite";

// ✅ Define your Appwrite configuration
export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67a0942a002f130479ce",
  storageId: "67a09a37000ba0e077a7",
  databaseId: "67a096a1003aa979384d",
  userCollectionId: "67a096e5001f0e5ac098",
  videoCollectionId: "67a0972e002ef20c0ab1",
};


const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export { account, storage, avatars, databases, ID, Query };


// Register user
// export async function createUser(email, password, username) {
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       username
//     );

//     if (!newAccount) throw Error;

//     const avatarUrl = avatars.getInitials(username);

//     await signIn(email, password);

//     const newUser = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       ID.unique(),
//       {
//         accountId: newAccount.$id,
//         email: email,
//         username: username,
//         avatar: avatarUrl,
//       }
//     );

//     return newUser;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Sign In
// export async function signIn(email, password) {
//   try {
//     return await account.createEmailPasswordSession(email, password);
//   } catch (error) {
//     console.error("Sign-in error:", error);
//     throw new Error(error.message || "Something went wrong during sign-in.");
//   }
// }


// // Get Account
// export async function getAccount() {
//   try {
//     const currentAccount = await account.get();

//     return currentAccount;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get Current User
// export async function getCurrentUser() {
//   try {
//     const currentAccount = await getAccount();
//     if (!currentAccount) throw Error;

//     const currentUser = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.userCollectionId,
//       [Query.equal("accountId", currentAccount.$id)]
//     );

//     if (!currentUser) throw Error;

//     return currentUser.documents[0];
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// // Sign Out
// export async function signOut() {
//   try {
//     const session = await account.deleteSession("current");

//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Upload File
// export async function uploadFile(file, type) {
//   if (!file) return;

//   const { mimeType, ...rest } = file;
//   const asset = { type: mimeType, ...rest };

//   try {
//     const uploadedFile = await storage.createFile(
//       appwriteConfig.storageId,
//       ID.unique(),
//       asset
//     );

//     const fileUrl = await getFilePreview(uploadedFile.$id, type);
//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get File Preview
// export async function getFilePreview(fileId, type) {
//   let fileUrl;

//   try {
//     if (type === "video") {
//       fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
//     } else if (type === "image") {
//       fileUrl = storage.getFilePreview(
//         appwriteConfig.storageId,
//         fileId,
//         2000,
//         2000,
//         "top",
//         100
//       );
//     } else {
//       throw new Error("Invalid file type");
//     }

//     if (!fileUrl) throw Error;

//     return fileUrl;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Create Video Post
// export async function createVideoPost(form) {
//   try {
//     const [thumbnailUrl, videoUrl] = await Promise.all([
//       uploadFile(form.thumbnail, "image"),
//       uploadFile(form.video, "video"),
//     ]);

//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       ID.unique(),
//       {
//         title: form.title,
//         thumbnail: thumbnailUrl,
//         video: videoUrl,
//         prompt: form.prompt,
//         creator: form.userId,
//       }
//     );

//     return newPost;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get all video Posts
// export async function getAllPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts created by user
// export async function getUserPosts(userId) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.equal("creator", userId)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get video posts that matches search query
// export async function searchPosts(query) {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.search("title", query)]
//     );

//     if (!posts) throw new Error("Something went wrong");

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get latest created video posts
// export async function getLatestPosts() {
//   try {
//     const posts = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.videoCollectionId,
//       [Query.orderDesc("$createdAt"), Query.limit(7)]
//     );

//     return posts.documents;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.error("CreateUser Error:", error);
    throw new Error(error.message || "User creation failed");
  }
}

// ✅ Sign In
export async function signIn(email, password) {
  try {
    // ✅ Pehle existing session ko delete karo
    await account.deleteSessions().catch(() => null);

    // ✅ Ab naye session ke liye sign-in karo
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error("Sign-in error:", error);
    throw new Error(error.message || "Something went wrong during sign-in.");
  }
}


// ✅ Get Account
export async function getAccount() {
  try {
    return await account.get();
  } catch (error) {
    console.error("GetAccount Error:", error);
    throw new Error(error.message || "Failed to get account");
  }
}

// ✅ Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("No account found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("User data not found in database.");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.error("GetCurrentUser Error:", error);
    return null;
  }
}

// ✅ Sign Out
export async function signOut() {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.error("SignOut Error:", error);
    throw new Error(error.message || "Sign out failed");
  }
}

// ✅ Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl
  try {
    if (!fileId) throw new Error("Invalid file ID");

    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if(!fileUrl) throw Error;
    return fileUrl
  } catch (error) {
    console.error("GetFilePreview Error:", error);
    throw new Error(error.message || "Failed to fetch file preview");
  }
}
// ✅ Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  }

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl
  } catch (error) {
    console.error("UploadFile Error==>", error);
    throw new Error(error.message || "File upload failed");
  }
}


// ✅ Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    if (!thumbnailUrl || !videoUrl) throw new Error("File upload failed");

    const newPost =  await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );
    return newPost
  } catch (error) {
    console.error("CreateVideoPost Error==>", error);
    throw new Error(error.message || "Failed to create video post");
  }
}

// ✅ Get All Video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.error("GetAllPosts Error:", error);
    throw new Error(error.message || "Failed to fetch posts");
  }
}

// ✅ Get User's Video Posts
export async function getUserPosts(userId) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.error("GetUserPosts Error:", error);
    throw new Error(error.message || "Failed to fetch user's posts");
  }
}

// ✅ Search Video Posts
export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    console.error("SearchPosts Error:", error);
    throw new Error(error.message || "Failed to search posts");
  }
}

// ✅ Get Latest Posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
  } catch (error) {
    console.error("GetLatestPosts Error:", error);
    throw new Error(error.message || "Failed to fetch latest posts");
  }
}