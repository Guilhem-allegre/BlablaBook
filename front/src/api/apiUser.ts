import type { IBook, IUser, IUserUpdate } from "../@types";
import { IError } from "../@types/auth";
import { authFetch } from "../utils/authFetch";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


// get the current user
// return null if user does not exist
export async function getOneUser(): Promise<IUser | null> {
    try{
  const response = await authFetch(`${apiBaseUrl}/user`);
  if (!response.ok) {
    return null; // null if the user doesn't exist
  }
  const user = await response.json();

// return user data
  return user;


} catch (error) {
    console.error("Erreur de chargement", error);
    throw error;
  }
}


// update user data
// throw error if request failed
export const updateUser = async (data: IUserUpdate) => {
  try {
    const res = await authFetch(`${apiBaseUrl}/user`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    const resData = await res.json();

 // if request failed build and throw error
    if (!res.ok) {
      const error: IError = {
        message: resData.message || "Erreur inconnue",
        status: resData.status,
        errors: resData.errors,
      };
      throw error;
    }

// return updated user
    return resData;
  } catch (error) {
    console.log("❌ Erreur capturée :", error);
    throw error;
  }
};

// delete current user
export const deleteUser = async (): Promise<void> => {
    try {
        const res = await authFetch(`${apiBaseUrl}/user`, {
          method: "DELETE",
        })
        if (!res.ok) {
            const resData = await res.json()
            const error: IError = {
              message: resData.message || "unknown error",
              status: resData.status,
              errors: resData.errors,
            }
            throw error
          }
        } catch (error) {
          console.error("❌ error in deleteUser", error)
          throw error
        }

};

/**
 * @function addToMyReadLibrary
 * @description Adds a book to the user's "read" library.
 *
 * @param {number} bookId - The ID of the book to mark as read.
 * @returns {Promise<IBook>} A promise that resolves to the added book object.
 *
 * @throws Will throw an error if the request fails or the response is not OK.
 */
export async function addToMyReadLibrary(bookId: number): Promise<IBook> {
  try {
    const response = await authFetch(
      `${apiBaseUrl}/user/books/read/${bookId}`,
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      throw new Error(`Impossible d'ajouter ce livre à la liste "lu" : ${response.statusText}`);
    }

    const book = await response.json();
    return book;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function deleteToMyReadLibrary
 * @description Deletes a book from the user's "read" library.
 *
 * @param {number} bookId - The ID of the book to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful, false otherwise.
 *
 * @throws Will throw an error if the request fails (e.g., network error or non-OK response).
 */
export async function deleteToMyReadLibrary(bookId: number): Promise<boolean> {
  try {
    const response = await authFetch(`${apiBaseUrl}/user/books/read/${bookId}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Impossible de supprimer ce livre de la liste "lu" : ${response.statusText}`);
    }
    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}

/**
 * @function addToWishRead
 * @description Adds a book to the user's "to-read" (wishlist) library.
 *
 * @param {number} bookId - The ID of the book to add to the wishlist.
 * @returns {Promise<IBook>} A promise that resolves to the added book object.
 *
 * @throws Will throw an error if the request fails or the response is not OK.
 */
export async function addToWishRead(bookId: number): Promise<IBook> {
  try {
    const response = await authFetch(`${apiBaseUrl}/user/books/to-read/${bookId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`Impossible d'ajouter ce livre à la liste "à lire" : ${response.statusText}`)
    }

    const book = await response.json();
    return book;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function deleteToWishRead
 * @description Deletes a book from the user's "to-read" (wishlist) library.
 *
 * @param {number} bookId - The ID of the book to remove from the wishlist.
 * @returns {Promise<boolean>} A promise that resolves to true if the deletion was successful, false otherwise.
 *
 * @throws Will throw an error if the request fails (e.g., network error or non-OK response).
 */
export async function deleteToWishRead(bookId: number): Promise<boolean> {
  try {
    const response = await authFetch(`${apiBaseUrl}/user/books/to-read/${bookId}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Impossible de supprimer ce livre de la liste "à lire" : ${response.statusText}`);
    }
    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getLibrary(id: number): Promise<IUser> {
  const response = await authFetch(`${apiBaseUrl}/user/library/${id}`);
  const book = await response.json();
  return book;
}
