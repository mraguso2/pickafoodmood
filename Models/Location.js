import mongoose from 'mongoose';
import slug from 'slug';

mongoose.Promise = global.Promise;

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!' // instead of Boolean, set the error message if not filled out
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply a user!'
  },
  description: {
    type: String,
    trim: true
  },
  slug: String,
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  tags: [String], // array of Strings
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [
      // make up a point - backwards: lng & lat
      {
        type: Number,
        required: 'You must supply coordinates!'
      }
    ],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  visited: {
    type: String,
    required: 'You must answer visited question'
  }, // to allow tracking future vs past locations
  visitDate: Date,
  modified: Date,
  creationDate: { type: Date, default: Date.now }
});

// Define our Indexes
locationSchema.index({
  name: 'text', // index as text to allow you to search within it
  address: 'text'
});

locationSchema.index({ location: '2dsphere' });

// run function before save
locationSchema.pre('save', async function rateIt(next) {
  // check if rating is within allowable limits
  if (this.rating <= 0) this.rating = 0;
  if (this.rating > 10) this.rating = 10;

  this.rating = this.rating.toFixed();

  next();
});

// run function before save
locationSchema.pre('save', async function slugIt(next) {
  // don't want to run this everytime - check if name is modified
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);

  // find other stores that have same slugs mike, mike-1, mike-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const placesWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (placesWithSlug.length) {
    this.slug = `${this.slug}-${placesWithSlug.length + 1}`;
  }

  next();
});

// function autopopulate(next) {
//   this.populate('author', '_id email firstname lastname');
//   next();
// }

// // add hooks whenever someone runs the find or findone to popualate author field
// locationSchema.pre('find', autopopulate);
// locationSchema.pre('findOne', autopopulate);

// export default mongoose.models.Location || mongoose.model('Location', locationSchema);

const modelFound = mongoose.models ? mongoose.models.Location : false;

export default modelFound || mongoose.model('Location', locationSchema);
