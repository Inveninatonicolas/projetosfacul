const { db } = require('../config/firebase');
const { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

class AtendimentoService {
    static async create(atendimentoData) {
        const docRef = await addDoc(collection(db, "atendimentos"), atendimentoData);
        return { id: docRef.id, ...atendimentoData };
    }

    static async getAll() {
        const snapshot = await getDocs(collection(db, "atendimentos"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async getById(id) {
        const docRef = doc(db, "atendimentos", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    }

    static async update(id, atendimentoData) {
        const docRef = doc(db, "atendimentos", id);
        await updateDoc(docRef, atendimentoData);
        return { id, ...atendimentoData };
    }

    static async delete(id) {
        const docRef = doc(db, "atendimentos", id);
        await deleteDoc(docRef);
        return { id };
    }
}

module.exports = AtendimentoService;