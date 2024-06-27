import axios from 'axios';

export async function upload (token, uploadUrl, data, onUploadProgress = null) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const request = axios.create({
      headers,
      onUploadProgress: event => {
        if (null == onUploadProgress) return;
        return onUploadProgress(Math.floor((event.loaded / event.total) * 100));
      },
    });

    let formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    const res = await request({
      method: 'POST',
      url: uploadUrl,
      data: formData,
    });

    if (200 == res.status) {
      if (0 == res.data.ret) return res.data;
      else {
        if (res.data.ret) throw `${res.data.ret} - ${res.data.msg}`;
      }
    }

    throw res;
  } 
  catch (error) {
    // const ComponentClass = Vue.extend(Toastr);
    // const instance = new ComponentClass({
    //   propsData: { title: 'Error', message: error, type: 'error' },
    // });
    // instance.$mount();
    // const snackbarTag = document.getElementById('snackbar');

    // if (snackbarTag) snackbarTag.appendChild(instance.$el);
    console.log('error', error);
    throw error;
  }
};
