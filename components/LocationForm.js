import React, { useRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import StarRating from './StarRating';
import { choices, prevDefaultOnEnter, TrashItButton } from './helpers.js';

const LocationForm = ({ location = {} }) => {
  const [starRating, setRating] = useState(location.rating || 0);
  const [tagsPicked, setTags] = useState(location.tags || []);
  const [visited, setVisited] = useState(location.visited || 'Yes');
  const [visitDay, setvisitDay] = useState(
    (location.visitDate && new Date(location.visitDate)) || new Date()
  );
  const [showModal, setShowModal] = useState(false);

  const addressInput = useRef(null);
  const nameInput = useRef(null);
  const latInput = useRef(null);
  const lngInput = useRef(null);
  const ratingInput = useRef(null);
  const descInput = useRef();
  const visitDayInput = useRef(null);

  const setParam = location._id ? `/${location._id}` : '';

  const handleRatingKeyChange = () => {
    const val = Number(ratingInput.current.value);
    const inp = document.querySelector(`[for=rating1_${ratingInput.current.value}]`);
    if (val < 1 || val > 10) return;
    setRating(val);
    inp.click();
  };

  const handleStarClick = index => {
    ratingInput.current.value = index;
    return setRating(index);
  };

  const handleVisitedBooRadio = e => {
    const visitedFlag = e.target.value;
    const otherOption = visitedFlag === 'No' ? undefined : new Date();

    setvisitDay((location.visitDate && new Date(location.visitDate)) || otherOption);
    setVisited(visitedFlag);
  };

  const handleDateChange = date => {
    visitDayInput.current.value = date;
    setvisitDay(date);
  };

  const handleTagClick = ({ currentTarget }) => {
    let newTags = [];
    const tagIndex = tagsPicked.findIndex(tag => tag === currentTarget.value);

    if (tagIndex === -1) {
      newTags = [...tagsPicked, currentTarget.value];
    } else {
      newTags = tagsPicked.map((tag, i) => (tagIndex === i ? null : tag)).filter(Boolean);
    }

    setTags(newTags);
  };

  // setting values on location editing form
  useEffect(() => {
    // check if empty location object
    if (Object.keys(location).length === 0 && location.constructor === Object) {
      return;
    }

    // set the form to values returned from DB
    const {
      location: loc,
      name,
      rating,
      description,
      visitDate,
      visited: visitYet,
      tags
    } = location;

    if (visitDate) {
      const formattedDate = new Date(visitDate);
      visitDayInput.current.value = formattedDate;
      setvisitDay(formattedDate);
    }

    addressInput.current.value = loc.address;
    nameInput.current.value = name;
    latInput.current.value = loc.coordinates && loc.coordinates[1];
    lngInput.current.value = loc.coordinates && loc.coordinates[0];
    ratingInput.current.value = rating;
    descInput.current.value = description;

    setRating(rating);
    setTags(tags);
    // setVisited(visitYet);
  }, []);

  // google places dropdown
  useEffect(() => {
    const dropdown = new window.google.maps.places.Autocomplete(addressInput.current);
    dropdown.addListener('place_changed', () => {
      const place = dropdown.getPlace();
      nameInput.current.value = place.name;
      latInput.current.value = place.geometry.location.lat();
      lngInput.current.value = place.geometry.location.lng();
    });
  }, []);

  return (
    <div className="flex justify-center w-full">
      <form
        action={`/api/locations${setParam}`}
        method="POST"
        className="moveUp relative w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 formWidth"
      >
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6"
            htmlFor="address"
          >
            Address
            <input
              // className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              // className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="address"
              type="text"
              name="location[address]"
              ref={addressInput}
              onKeyDown={e => prevDefaultOnEnter(e)}
              placeholder="Mike's Pizza, 8 Cheesy Way"
              required
            />
          </label>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6"
            htmlFor="name"
          >
            Location Name | Nickname
            <input
              // className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              name="name"
              ref={nameInput}
              placeholder="Pizzza Place"
              required
            />
          </label>

          <div className="hideMe w-auto flex items-center justify-around mb-6">
            <div className="latAndLng">
              <label
                className="w-1/2 uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="lng"
              >
                Longitude #
                <input
                  // className="shadow appearance-none border rounded py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  className="latAndLng shadow appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lng"
                  type="text"
                  name="location[coordinates][0]"
                  ref={lngInput}
                  placeholder="Auto fill"
                />
              </label>
            </div>
            <div className="latAndLng">
              <label
                className="w-1/2 uppercase tracking-wide text-gray-700 text-xs font-bold"
                htmlFor="lat"
              >
                Latitude #
                <input
                  // className="shadow appearance-none border rounded py-2 px-3 mt-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  className="latAndLng shadow appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="lat"
                  type="text"
                  name="location[coordinates][1]"
                  ref={latInput}
                  placeholder="Auto fill"
                />
              </label>
            </div>
          </div>
          <div className="w-auto flex items-center justify-around">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6"
              htmlFor="visited"
            >
              Visited?
              <div className="flex mt-2">
                <div className="flex items-center mr-3">
                  <label className="flex items-center justify-center" htmlFor="visitedYes">
                    <input
                      className="form-radio h-4 w-4 text-gray-600"
                      id="visitedYes"
                      type="radio"
                      name="visited"
                      value="Yes"
                      checked={visited === 'Yes'}
                      onChange={e => handleVisitedBooRadio(e)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center justify-center" htmlFor="visitedNo">
                    <input
                      className="form-radio h-4 w-4 text-gray-600"
                      id="visitedNo"
                      type="radio"
                      name="visited"
                      value="No"
                      checked={visited !== 'Yes'}
                      onChange={e => handleVisitedBooRadio(e)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </label>
            <label
              className={`block relative uppercase tracking-wide text-gray-700 text-xs font-bold mb-6 transition-opacity duration-200 ${
                visited !== 'Yes' ? 'notAvail opacity-0 zBack' : 'opacity-100'
              }`}
              htmlFor="visitDay"
              tabIndex={visited === 'Yes' ? 0 : -1}
            >
              Visit Date
              <input
                className={`hidden shadow appearance-none w-32 text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                  visited !== 'Yes' ? 'notAvail' : ''
                }`}
                type="text"
                id="visitDayId"
                name="visitDate"
                ref={visitDayInput}
                defaultValue={visitDay}
              />
              <div className={`relative ${visited === 'Yes' ? '' : 'invisible'}`}>
                <div className="absolute appearance-none w-32 h-full rounded py-2 px-3 mt-1" />
                <DatePicker
                  className="shadow appearance-none w-32 text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="visitDate1"
                  selected={visitDay}
                  onChange={handleDateChange}
                />
              </div>
            </label>
          </div>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6"
            htmlFor="description"
          >
            Description
            <textarea
              // className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              className="shadow appearance-none w-full text-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              type="text"
              name="description"
              placeholder="Delish - got the pizzza"
              ref={descInput}
            />
          </label>
          <hr className="exSqueezeMe" />
          <label
            className="ratingLabel uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
            htmlFor="rating"
          >
            Rating
            <input
              // className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
              className="ratingInput shadow-sm appearance-none text-sm bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-3 mt-1 leading-tight focus:outline-none focus:border-gray-500"
              id="rating"
              type="number"
              name="rating"
              min="1"
              max="10"
              step="1"
              placeholder="6"
              ref={ratingInput}
              onChange={() => handleRatingKeyChange()}
            />
          </label>
          <StarRating
            name="rating1"
            starCount={10}
            value={starRating}
            onStarClick={(nextValue, prevValue, name) =>
              handleStarClick(nextValue, prevValue, name)
            }
          />
          <hr className="exSqueezeMe extra" />
          <div className="mb-8 flex flex-wrap align-center">
            {choices.map((choice, i) => (
              <React.Fragment key={`${choice}_${i + 1}`}>
                <input
                  className="appearance-none"
                  type="checkbox"
                  id={`${choice}_${i + 1}`}
                  name="tags"
                  value={choice}
                  checked={tagsPicked && tagsPicked.includes(choice)}
                  onChange={e => handleTagClick(e)}
                />
                <label
                  className="tags cursor-pointer inline-block rounded-full text-gray-600 bg-gray-200 uppercase px-2 py-1 m-1 mb-2 text-xs mr-3"
                  htmlFor={`${choice}_${i + 1}`}
                >
                  #{choice}
                </label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={`flex items-center ${setParam ? 'justify-between' : 'justify-center'}`}>
          <button
            className="bg-nxtBlue text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline buttText"
            type="submit"
          >
            Save Location
          </button>
          {setParam ? (
            <TrashItButton
              name={location.name || ''}
              id={location._id || ''}
              showModal={showModal}
              setModal={setShowModal}
            />
          ) : (
            ''
          )}
        </div>
      </form>
      <style jsx>{`
        .hideMe {
          display: none;
        }
        .latAndLng {
          width: 125px;
        }
        .moveUp {
          top: -3.5rem;
        }
        .bg-nxtBlue {
          background-color: #2a4365;
          border: 1px solid #2a4365;
        }
        .bg-nxtBlue:hover {
          background-color: #2a4365;
          border: 1px solid #2a4365;
        }
        .exSqueezeMe {
          margin: 20px 0;
        }
        .extra {
          margin-bottom: 1.5rem;
        }
        .ratingLabel {
          display: flex;
          justify-content: center;
          align-items: baseline;
        }
        .ratingInput {
          width: 65px;
          margin-left: 15px;
          text-align: center;
        }
        .tags {
          font-weight: 600;
        }
        .notAvail {
          cursor: not-allowed;
        }
        .zBack {
          z-index: -10;
        }
        .opacity-50 {
          opacity: 0.5;
        }
        input[type='checkbox']:checked + label {
          background-color: #434190;
          color: #eff5ff;
        }
        @media only screen and (max-width: 480px) {
          .formWidth {
            width: 340px;
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .buttText {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default LocationForm;
