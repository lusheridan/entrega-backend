const admin = require("firebase-admin");

const serviceAccount = require("../firebaseKey.js");
const { logError } = require("../helpers/logger.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class ContenedorFirebase {
  constructor(collectionName) {
    const db = admin.firestore();
    this.collection = db.collection(collectionName);
  }

  async getAll() {
    try {
      const records = await this.collection.get();
      let docs = records.docs;
      const response = docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return response;
    } catch (error) {
      return [];
    }
  }

  async getById(id) {
    const doc = await this.collection.doc(`${id}`);
    const item = await doc.get();
    const response = { id: doc.id, ...item.data() };
    return response;
  }

  async save(record) {
    try {
      const doc = this.collection.doc();
      await doc.create(record);
      return record;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }

  async editById(id, newValues) {
    try {
      const doc = this.collection.doc(`${id}`);
      await doc.update(newValues);
      return newValues;
    } catch (error) {
      logError.error("Error al actualizar por ID", error);
      if (error.code === 5) {
        return false;
      }
      throw new Error(`Error al actualizar: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const doc = this.collection.doc(`${id}`);
      await doc.delete();
      return true;
    } catch (error) {
      throw new Error(`Error al borrar Id ${id}: ${error}`);
    }
  }
}

module.exports = ContenedorFirebase;
