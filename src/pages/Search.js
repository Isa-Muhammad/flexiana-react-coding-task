import React, { useState, useRef } from "react";
import { getCollaborators, getRepositories } from "../utility/utils";
import Card from "../components/Card";

export default function Search() {
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(false);
  const [searchBox, setSearchBox] = useState(true);
  const [searchBoxTwo, setSearchBoxTwo] = useState(false);

  const searchRef = useRef();
  const repoSearchRef = useRef();

  const getUsers = async (e) => {
    const enteredValue = searchRef.current.value;
    setError(false);
    if (e.key === "Enter" && enteredValue) {
      await getCollaborators(enteredValue)
        .then((data) => setUsers(data))
        .catch(() => {
          setError(true);
          setUsers([]);
        });
    }
  };

  const getRepos = async (e) => {
    const enteredValue = repoSearchRef.current.value;
    setError(false);
    if (e.key === "Enter" && enteredValue) {
      await getRepositories(enteredValue)
        .then((data) => setRepos(data))
        .catch(() => {
          setError(true);
          setRepos([]);
        });
    }
  };

  const getInputBox = () => {
    setSearchBox(true);
    setSearchBoxTwo(false);
  };

  const getInputBox2 = () => {
    setSearchBoxTwo(true);
    setSearchBox(false);
  };

  return (
    <>
      <div className="main-section py-24 px-96">
        <div className="flex">
          {searchBox && (
            <input
              className="searchBox"
              type="text"
              placeholder="Enter repository name e.g facebook/react"
              onKeyDown={(e) => getUsers(e)}
              ref={searchRef}
            />
          )}

          {searchBoxTwo && (
            <input
              className="searchBox"
              type="text"
              placeholder="Enter keyword"
              onKeyDown={(e) => getRepos(e)}
              ref={repoSearchRef}
            />
          )}

          <select
            onChange={(e) => {
              if (e.target.value === "keyword") {
                getInputBox2();
              } else {
                getInputBox();
              }
            }}
            className="select"
          >
            <option>repository</option>
            <option>keyword</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center ">
        {searchBox ? (
          <h1 className="font-bold">Contributors</h1>
        ) : (
          <h1 className="font-bold">Repositories</h1>
        )}
        <div className="py-10 grid grid-cols-5 ">
          {searchBox &&
            users.map((user, i) => (
              <Card
                profilePicture={user.avatar_url}
                name={user.login}
                profileLink={user.html_url}
                title="Go to profile"
                key={i}
              />
            ))}

          {searchBoxTwo &&
            repos.map((repo, i) => (
              <div key={i} className=" repoCard">
                <div className=" flex justify-between">
                  <div>
                    <p>Name:</p>
                    <p>Owner:</p>
                  </div>
                  <div>
                    <h1>{repo.node.name}</h1>
                    <h1>{repo.node.owner.login}</h1>
                  </div>
                </div>
                <div className="flex justify-center">
                  <a className=" mt-4 text-blue-400" href={repo.node.url}>
                    Go to repository
                  </a>
                </div>
              </div>
            ))}
        </div>

        {error && <small className="text-red-400">Not found</small>}
      </div>
    </>
  );
}
