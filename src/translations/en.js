/*
Naming convention
  Module: Eg. Supplier, Raw Mat, etc.
  Type: act-action, lbl-label, success, error

  {module}.{type}.{actual wording short form}
  {module}.{sub module}.{type}.{actual wording short form}
*/

import labels from './labels/en';
import maps from './maps/en';
export default {
  ...labels,
  ...maps,
  //------------------------------------
  //Login page labels
  //------------------------------------

  'login.lbl.email': 'Email',
  'login.lbl.password': 'Password',
  'login.btn.register': 'Register',
  'login.btn.recoverPwd': 'Recover password',
  'login.btn.login': 'Login',

  //------------------------------------
  //Register page labels
  //------------------------------------

  'register.lbl.title': 'Registration',
  'register.lbl.subtitle': 'Please enter a valid email to receive verification link.',
  'register.lbl.email': 'Email',
  'register.lbl.dialog': 'A link has been sent to your mailbox please click the link to proceed.',
  'register.btn.register': 'Register',
  'register.btn.back': 'Back',

  //------------------------------------
  //Register page labels
  //------------------------------------

  'resetpwd.lbl.title': 'Forgot Password',
  'resetpwd.lbl.subtitle': 'Please enter a valid email to receive reset link.',
  'resetpwd.lbl.email': 'Email',
  'resetpwd.btn.back': 'I have a password',
  'resetpwd.btn.send': 'Send me reset link',

  // -----------------------------------

  'transaction.lbl.filter': 'FILTER (CLICK TO OPEN DROPDOWN)',


  'act.activate': 'Activate',
  'act.approve': 'Approve',
  'act.back': 'Back',
  'act.cancel': 'Cancel',
  'act.close': 'Close',
  'act.confirm': 'Confirm',
  'act.create': 'Create',
  'act.delete': 'Delete',
  'act.done': 'Done',
  'act.new': 'New',
  'act.no': 'No',
  'act.receive': 'Receive',
  'act.refresh': 'Refresh',
  'act.reject': 'Reject',
  'act.save': 'Save',
  'act.select': 'Select',
  'act.START': 'START',
  'act.submit': 'Submit',
  'act.suspend': 'Suspend',
  'act.takePhoto': 'Take Photo',
  'act.update': 'Update',
  'act.yes': 'Yes',

  err: {
    lbl: {
      imgUploadFailed: 'Failed to upload image',
      invalidFileType: 'Invalid file type. We only support {value}',
      invalidPhoneFormat: 'Invalid Phone Format',
      invalidSerialNo: 'Invalid Serial No.',
      uploadMaxSize: 'File size exceeds {value}',
    },
  },

  


  time: {
    lbl: {
      ago: 'ago',
      day: 'day',
      days: 'days',
      hour: 'hour',
      hours: 'hours',
      min: 'min',
      mins: 'mins',
      month: 'month',
      months: 'months',
      sec: 'sec',
      secs: 'secs',
      year: 'year',
      years: 'years',
    }
  },


  
  route: {
    


  },
};
