import * as mongoose from 'mongoose';
import User from '../common/interfaces/user.interface';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: Number,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: false
  },
  company: {
    type: String,
    required: false
  },
  registerDate: {
    type: Date,
    default: new Date()
  },
  subscribe: {
    type: Date,
    required: false
  }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(String(this.password), salt);
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
