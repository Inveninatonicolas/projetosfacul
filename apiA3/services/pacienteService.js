const { db } = require('../config/firebase');
const { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc } = require('firebase/firestore');

class PacienteService {
    static async create(pacienteData) {
        const docRef = await addDoc(collection(db, "pacientes"), pacienteData);
        return { id: docRef.id, ...pacienteData };
    }

    static async getAll() {
        const snapshot = await getDocs(collection(db, "pacientes"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    static async getById(id) {
        const docRef = doc(db, "pacientes", id);
        const docSnap = await getDoc(docRef);
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    }

    static async update(id, pacienteData) {
        const docRef = doc(db, "pacientes", id);
        await updateDoc(docRef, pacienteData);
        return { id, ...pacienteData };
    }

    static async delete(id) {
        const docRef = doc(db, "pacientes", id);
        await deleteDoc(docRef);
        return { id };
    }
}

module.exports = PacienteService;