import {ref, storageRef} from '../config/constants'
import { store } from '../store'


const get = (path, action) => {
  return (dispatch) => {
    let data = []
    ref.collection(path).get().then((snap) => {
      snap.forEach((doc) => {
        data.push(doc.data());
      })
      dispatch({
        type: action,
        payload: data,
        status: 'success'
      })
    })
  }
}

const post = (item, path, action, getData) => {
  const itemRef = ref.collection(path).doc();
  item.id = itemRef.id;

  itemRef.set(item)
    .then((item) => {
      store.dispatch({
        type: action,
        status: 'pending',
        payload: store.getState()[path][path]
      })
      if (getData) {
        store.dispatch(getData());
      }
    })
}

const update = (item, path, action, getData) => {
  const itemRef = ref.collection(path).doc(item.id);

  itemRef.set(item)
    .then((item) => {
      store.dispatch({
        type: action,
        status: 'pending',
        payload: store.getState()[path][path]
      })
      if (getData) {
        store.dispatch(getData());
      }
    })
}

const remove = (id, path, action, getData) => {
  const itemRef = ref.collection(path).doc(id);

  itemRef.delete()
    .then(() => {
      store.dispatch({
        type: action,
        status: 'pending',
        payload: store.getState()[path][path]
      })
      if (getData) {
        store.dispatch(getData());
      }
    })
}


//Jobs
export const getJobs = () => {
  return get('jobs', 'GET_JOBS');
}

export const newJob = (job) => {
  post(job, 'jobs', 'GET_JOBS', getJobs);
}

export const editJob = (job) => {
  update(job, 'jobs', 'GET_JOBS', getJobs);
}

export const deleteJob = (id) => {
  remove(id, 'jobs', 'GET_JOBS', getJobs);
}


//Notes
export const getNotes = () => {
  return get('notes', 'GET_NOTES');
}

export const newNote = (note) => {
  post(note, 'notes', 'GET_NOTES', getNotes);
}

export const editNote = (note) => {
  update(note, 'notes', 'GET_NOTES', getNotes);
}

export const deleteNote = (id) => {
  remove(id, 'notes', 'GET_NOTES', getNotes);
}

export const uploadImage = (file, id) => {
  const notesImgRef = storageRef.child('notes/');
  return new Promise((resolve, reject)=>{
    notesImgRef.child(file.name).put(file).then((snapshot) => {
        if (snapshot) {
          const url = snapshot.downloadURL;
          resolve(url);
        }
    });
  });
}


//Customers
export const getCustomers = () => {
  return get('customers', 'GET_CUSTOMERS');
}

export const newCustomer = (customer) => {
  post(customer, 'customers', 'GET_CUSTOMERS', getCustomers);
}

export const editCustomer = (customer) => {
  update(customer, 'customers', 'GET_CUSTOMERS', getCustomers);
}

export const deleteCustomer = (id) => {
  remove(id, 'customers', 'GET_CUSTOMERS', getCustomers);
}

//Invoices
export const getInvoices = () => {
  return get('invoices', 'GET_INVOICES');
}

export const newInvoice = (invoice) => {
  post(invoice, 'invoices', 'GET_INVOICES', getInvoices);
}

export const editInvoice = (invoice) => {
  update(invoice, 'invoices', 'GET_INVOICES', getInvoices);
}

export const deleteInvoice = (id) => {
  remove(id, 'invoices', 'GET_INVOICES', getInvoices);
}