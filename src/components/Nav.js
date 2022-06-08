import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {	fetchPosts } from "../features/Posts/postsSlice";

export default function Nav() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("")
  const [subreddit, setSubreddit] = useState("None")
  const [subsSelection, setSubsSelection] = useState("hidden")
  
  const handleSearch = (event) => {
    const value = event.target.value
    setSearchTerm(value)
    dispatch(fetchPosts({searchTerm: value, subreddit: subreddit, after: "initial"}));
  }

  const handleCheckbox = (event) => {
    const value = event.target.value
    setSubreddit(value)
    dispatch(fetchPosts({searchTerm: searchTerm, subreddit: value, after: "initial"}));
  }

  const toggleSubreddits = (event) => {
    event.preventDefault();
    subsSelection === 'hidden' ? setSubsSelection('show') : setSubsSelection('hidden')
  }

  const subredditsContainer = () => {
      const subredditsArray = ['Kitten','SupermodelCats','blackcats','catsAreAssholes','curledfeetsies','CatsStandingUp','ragdolls']

      return (
        <div className="subreddits-container">
          <label>
            <input type="radio" id="subreddit-menu-none" name="subreddit" value="None" onChange={handleCheckbox} checked={subreddit === 'None'} />
            <span className='subreddit-none'>None</span>
          </label>
          {subredditsArray.map(element => {
            return (
              <label>
                <input type="radio" id={`subreddit-menu-${element}`} name="subreddit" value={element} onChange={handleCheckbox} checked={subreddit === element}/>
                <span className='subreddit-r'>r/</span>{element}
              </label>
            )
          })}

        </div>
      )
  }

  return (
    <form>
      <input className="search-bar" type="text" name="searchTerm" value={searchTerm} onChange={handleSearch}/>
      <button className="subreddits-btn" onClick={toggleSubreddits}>
        Subreddits
      </button>
      { subsSelection === 'show' ? subredditsContainer() : undefined}
    </form>
  );
}