import React from 'react';
import Link from 'next/link';
import StarRating from './StarRating';
import { choices } from './helpers';

const TagIt = ({ choice, i, tagsPicked, handleTagClick = () => {} }) => (
  <>
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
      className="cursor-pointer inline-block rounded-full text-gray-600 bg-gray-200 uppercase px-2 py-1 m-1 mb-2 text-xs mr-3"
      htmlFor={`${choice}_${i + 1}`}
    >
      #{choice}
    </label>
  </>
);

const LocationCard = ({ location = {} }) => (
  <li className="w-64 stretchCard bg-white shadow-md rounded p-5 mb-6 mr-3 ml-3" key={location._id}>
    <Link href={`/p/${location.slug}`}>
      <a>
        <div className="h-full">
          <h3 className="font-medium text-gray-900 text-xl">{location.name}</h3>
          <p className="text-gray-600 text-xs leading-snug mb-4">{location.location.address}</p>
          <StarRating
            name="rating1"
            starCount={10}
            value={location.rating}
            editing={false}
            xtraStyles={{ marginLeft: '3px', fontSize: '16px', cursor: 'pointer' }}
          />
          <div className="flex flex-wrap align-center">
            {location.tags
              .filter(choice => choices.includes(choice))
              .map((choice, i) => (
                <React.Fragment key={`${choice}_${i + 1}`}>
                  <input
                    className="appearance-none"
                    type="checkbox"
                    id={`${choice}_${i + 1}`}
                    name="tags"
                    value={choice}
                    disabled
                  />
                  <label
                    className="cursor-pointer inline-block rounded-full checked uppercase px-2 py-1 m-1 text-xs mr-3"
                    htmlFor={`${choice}_${i + 1}`}
                  >
                    #{choice}
                  </label>
                </React.Fragment>
              ))}
          </div>
        </div>
      </a>
    </Link>
    <style jsx>{`
      .checked {
        background-color: #434190;
        color: #eff5ff;
        font-weight: 500;
        font-size: 0.6rem;
      }
      @media only screen and (max-width: 562px) {
        .stretchCard {
          width: 100%;
          max-width: 24rem;
          margin-left: 1.5rem;
          margin-right: 1.5rem;
        }
      }
    `}</style>
  </li>
);

export default LocationCard;
