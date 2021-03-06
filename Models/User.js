import mongoose, { model } from 'mongoose';
import md5 from 'md5';
import { isEmail } from 'validator';
import mongodbErrorHandler from 'mongoose-mongodb-errors';

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  firstname: {
    type: String,
    required: 'Please supply a first name',
    trim: true
  },
  lastname: {
    type: String,
    required: 'Please supply a last name',
    trim: true
  },
  password: {
    type: String,
    required: 'Please supply a password'
  },
  validatedEmail: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  creationDate: { type: Date, default: Date.now }
});

// creating a virtual field, gravatar
userSchema.virtual('gravatar').get(function getGravatar() {
  // this = user
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

// set options: usernameField to the "email" vs default "username"
userSchema.plugin(mongodbErrorHandler);

const modelFound = mongoose.models ? mongoose.models.User : false;
export default modelFound || mongoose.model('User', userSchema);
