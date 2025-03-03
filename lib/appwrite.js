import {
  Client,
  Account,
  Avatars,
  Databases,
  ID,
  Query,
  Storage,
} from "appwrite";

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

export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
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
  let fileUrl;
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
    if (!fileUrl) throw Error;
    return fileUrl;
  } catch (error) {
    console.error("GetFilePreview Error:", error);
    throw new Error(error.message || "Failed to fetch file preview");
  }
}

export async function uploadFile(file, type) {
  if (!file) {
    return null;
  }

  const fileExtension = file.fileName?.split(".").pop().toLowerCase();

  const allowedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "mp4",
    "mov",
    "avif",
    "mkv",
    "pdf",
    "docx",
    "xlsx",
  ];
  if (!allowedExtensions.includes(fileExtension)) {
    return null;
  }

  try {
    const response = await fetch(file.uri);
    const fileBlob = await response.blob();

    const fileObj = new File(
      [fileBlob],
      file.fileName || `upload.${fileExtension}`,
      { type: file.mimeType }
    );

    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      fileObj
    );

    const fileUrl = storage.getFileView(
      appwriteConfig.storageId,
      uploadedFile.$id
    );

    return fileUrl;
  } catch (error) {
    return null;
  }
}

export async function createVideoPost(form) {
  try {
    const thumbnailUrl = await uploadFile(form.thumbnail, "image");

    const videoUrl = await uploadFile(form.video, "video");

    if (!thumbnailUrl || !videoUrl) {
      throw new Error("File upload failed");
    }

    const newPost = await databases.createDocument(
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

    return newPost;
  } catch (error) {
    console.error("CreateVideoPost Error:", error);
    throw new Error(error.message || "Failed to create video post");
  }
}

// Get All Video Posts
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

//  Get User's Video Posts
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

//  Search Video Posts
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

//  Get Latest Posts
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
