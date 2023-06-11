import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp } from 'firebase-admin/app';
import { DocumentData } from '@google-cloud/firestore';

abstract class BaseController<T extends DocumentData> {
  protected firestore: FirebaseFirestore.Firestore;
  protected collectionName: string;

  constructor(collectionName: string) {
    initializeApp();
    this.firestore = getFirestore();
    this.collectionName = collectionName;
  }

  protected getCollection(): FirebaseFirestore.CollectionReference {
    return this.firestore.collection(this.collectionName);
  }

  protected async getAllDocuments(): Promise<T[]> {
    const snapshot = await this.getCollection().get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  protected async getDocumentById(id: string): Promise<T | null> {
    const snapshot = await this.getCollection().doc(id).get();
    return snapshot.exists ? (snapshot.data() as T) : null;
  }

  protected async createDocument(data: T): Promise<string> {
    const documentRef = await this.getCollection().add({data});
    const id = documentRef.id
    documentRef.set({...data, id})
    return documentRef.id;
  }

  protected async updateDocument(id: string, data: Partial<T>): Promise<void> {
    await this.getCollection().doc(id).update(data);
  }

  protected async deleteDocument(id: string): Promise<void> {
    await this.getCollection().doc(id).delete();
  }
}

export default BaseController;