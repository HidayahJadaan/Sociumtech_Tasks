const mainConainer = document.querySelector(".container");
const jobsContainer = document.querySelector(".jobs");
const clear = document.querySelector(".search_clear");
const header = document.querySelector(".header");
//================================================
const TAG_ACTIVE_CLASS = "key-active";
const SEARCH_HIDDEN_CLASS = "search--hidden";
const CLOSE_TAG_CLASS = "key-close";
const TAG_CLASS = "keyword";
//================================================
const jobsListings = [
  {
    id: 1,
    company: "Photosnap",
    logo: "./images/photosnap.svg",
    new: true,
    featured: true,
    position: "Senior Frontend Developer",
    role: "Frontend",
    level: "Senior",
    postedAt: "1d ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["HTML", "CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 2,
    company: "Manage",
    logo: "./images/manage.svg",
    new: true,
    featured: true,
    position: "Fullstack Developer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1d ago",
    contract: "Part Time",
    location: "Remote",
    languages: ["Python"],
    tools: ["React"],
  },
  {
    id: 3,
    company: "Account",
    logo: "./images/account.svg",
    new: true,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2d ago",
    contract: "Part Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
  {
    id: 4,
    company: "MyHome",
    logo: "./images/myhome.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "5d ago",
    contract: "Contract",
    location: "USA Only",
    languages: ["CSS", "JavaScript"],
    tools: [],
  },
  {
    id: 5,
    company: "Loop Studios",
    logo: "./images/loop-studios.svg",
    new: false,
    featured: false,
    position: "Software Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "1w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["Ruby", "Sass"],
  },
  {
    id: 6,
    company: "FaceIt",
    logo: "./images/faceit.svg",
    new: false,
    featured: false,
    position: "Junior Backend Developer",
    role: "Backend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "UK Only",
    languages: ["Ruby"],
    tools: ["RoR"],
  },
  {
    id: 7,
    company: "Shortly",
    logo: "./images/shortly.svg",
    new: false,
    featured: false,
    position: "Junior Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["HTML", "JavaScript"],
    tools: ["Sass"],
  },
  {
    id: 8,
    company: "Insure",
    logo: "./images/insure.svg",
    new: false,
    featured: false,
    position: "Junior Frontend Developer",
    role: "Frontend",
    level: "Junior",
    postedAt: "2w ago",
    contract: "Full Time",
    location: "USA Only",
    languages: ["JavaScript"],
    tools: ["Vue", "Sass"],
  },
  {
    id: 9,
    company: "Eyecam Co.",
    logo: "./images/eyecam-co.svg",
    new: false,
    featured: false,
    position: "Full Stack Engineer",
    role: "Fullstack",
    level: "Midweight",
    postedAt: "3w ago",
    contract: "Full Time",
    location: "Worldwide",
    languages: ["JavaScript", "Python"],
    tools: ["Django"],
  },
  {
    id: 10,
    company: "The Air Filter Company",
    logo: "./images/the-air-filter-company.svg",
    new: false,
    featured: false,
    position: "Front-end Dev",
    role: "Frontend",
    level: "Junior",
    postedAt: "1mo ago",
    contract: "Part Time",
    location: "Worldwide",
    languages: ["JavaScript"],
    tools: ["React", "Sass"],
  },
];

//================================================

function getJobListingHTML(jobData, filterTags = []) {
  const jobsItem = document.createElement("div");
  jobsItem.classList.add("jobs_item");
  const span = document.createElement("div");
  span.classList.add("jobs_item_span");

  jobsItem.appendChild(span);

  const leftCol = document.createElement("div");
  leftCol.classList.add("jobs_col");
  leftCol.classList.add("jobs_left_col");

  const logo = document.createElement("img");
  logo.classList.add("jobs_img");
  logo.src = jobData.logo;

  leftCol.appendChild(logo);

  const jobsInfo = document.createElement("div");
  jobsInfo.classList.add("jobs_Info");

  const jobsCompany = document.createElement("span");
  jobsCompany.classList.add("jobs_company");
  jobsCompany.textContent = jobData.company;

  jobsInfo.appendChild(jobsCompany);

  if (jobData.new) {
    const span = document.createElement("span");
    span.classList.add("new");
    span.textContent = "New!";
    jobsInfo.appendChild(span);
  }

  if (jobData.featured) {
    const span = document.createElement("span");
    span.classList.add("feature");
    span.textContent = "Featured";
    jobsInfo.appendChild(span);
  }

  const jobsTilte = document.createElement("span");
  jobsTilte.classList.add("jobs_title");
  jobsTilte.textContent = jobData.position;

  const jobsDetails = document.createElement("ul");
  jobsDetails.classList.add("jobs_details");

  const jobsDetailsItem1 = document.createElement("li");
  jobsDetailsItem1.classList.add("jobs_details_item");
  jobsDetailsItem1.textContent = jobData.postedAt;

  const jobsDetailsItem2 = document.createElement("li");
  jobsDetailsItem2.classList.add("jobs_details_item");
  jobsDetailsItem2.textContent = jobData.contract;

  const jobsDetailsItem3 = document.createElement("li");
  jobsDetailsItem3.classList.add("jobs_details_item");
  jobsDetailsItem3.textContent = jobData.location;

  jobsDetails.appendChild(jobsDetailsItem1);
  jobsDetails.appendChild(jobsDetailsItem2);
  jobsDetails.appendChild(jobsDetailsItem3);
  jobsInfo.appendChild(jobsTilte);
  jobsInfo.appendChild(jobsDetails);

  leftCol.appendChild(jobsInfo);
  jobsItem.appendChild(leftCol);

  let tagsString = "";

  const keys = [
    jobData.role,
    jobData.level,
    ...(jobData.languages || []),
    ...(jobData.tools || []),
  ];

  //checks whether the job listing'keys (role, level, languages, and tools) match any of the keys specified in the filterTags array.

  /*
    
    1. If (filterTags) is an empty array (filterTags.length is 0), 
    ===================> then the job listing automatically passes the filter (!filterTags.length is true).


    2. .some() method to check if any of the filter tags are included in the tagsListLowercase. 
    ===================> passesFilter becomes true.

    */
  const passesFilter =
    !filterTags.length ||
    filterTags.some((tag) =>
      keys.some(
        (key) => key && key.toLowerCase().includes(tag && tag.toLowerCase())
      )
    );

  if (!passesFilter) {
    return null;
    // If there are filter tags specified, and the job listing doesn't contain any of these filter tags --> return null (that jobs_Item should not be displayed)
  }

  // else : If the job listing passes the filter ----> generate HTML for the job listing's tags and the right column;

  for (const currentTag of keys) {
    const activeClass =
      (filterTags.includes(currentTag) && TAG_ACTIVE_CLASS) || ""; //if the currentTag matches one of the selected filter tags, activeClass will be set to the value of TAG_ACTIVE_CLASS.
    tagsString += `<button class="${TAG_CLASS} ${activeClass}">${currentTag}</button>`;
  }

  /*
    If currentTag is found in filterTags, it sets activeClass to TAG_ACTIVE_CLASS.
    If currentTag is not found in filterTags, it sets activeClass to an empty string.
  */

  const jobListingHTML = `
      <div class="jobs_col jobs_right_col">
        ${tagsString}
      </div>
    </div>
    `;

  const jobsRightCol = document.createElement("div");
  jobsRightCol.classList.add("jobs_col");
  jobsRightCol.classList.add("jobs_right_col");
  jobsRightCol.innerHTML = jobListingHTML;

  jobsItem.appendChild(jobsRightCol);

  jobsContainer.appendChild(jobsItem);

  return jobsItem;
}

//================================================
function toggleClass(Ele, className) {
  if (Ele.classList.contains(className)) {
    Ele.classList.remove(className);
  } else {
    Ele.classList.add(className);
  }
}
//================================================
function getSearchBarTags(tagValue, searchContentEl) {
  // Initialize an empty array to store the list of keys/tags.
  let searchBarTags = [];

  for (const child of Array.from(searchContentEl.children)) {
    // Get the innerHTML of the child element and trim any whitespace.
    const tag = child.innerHTML && child.innerHTML.trim();

    // If the tag is not empty (after trimming whitespace), add it to the searchBarTags array.
    if (tag) {
      searchBarTags.push(tag);
    }
  }

  // Check if the tagValue is already in the searchBarTags array
  if (searchBarTags.includes(tagValue)) {
    searchBarTags = searchBarTags.filter((tag) => tag !== tagValue);
  } else {
    searchBarTags.push(tagValue);
  }

  // Return the updated searchBarTags array.
  return searchBarTags;
}

//================================================

// updating the job listings based on the provided filterTags
function FiterJobsListings(filterTags) {
  const jobsContainer = document.querySelector(".jobs");
  jobsContainer.innerHTML = ""; // Clear the existing job listings

  for (const currentListing of jobsListings) {
    const jobListingElement = getJobListingHTML(currentListing, filterTags);

    if (jobListingElement !== null) {
      jobsContainer.appendChild(jobListingElement); // Add valid job listings to the DOM.
    }
  }
}

//================================================

//manages the visibility of a search wrapper element

function displaySearchWrapper(display = false) {
  const searchWrapper = document.getElementById("search");

  if (display) {
    searchWrapper.classList.remove(SEARCH_HIDDEN_CLASS);
  } else {
    searchWrapper.classList.add(SEARCH_HIDDEN_CLASS);
  }
}

//================================================
//updates the content of a search bar with the provided tags/keys

function setSearchbarContent(searchContentEl, tags) {
  let content = "";

  for (const currentTag of tags) {
    content += `<button class="${CLOSE_TAG_CLASS}">${currentTag}</button>`;
  }

  searchContentEl.innerHTML = content;
}
//================================================
// Handle Clear Button

function resetState(searchContentEl) {
  searchContentEl.innerHTML = "";
  FiterJobsListings();
  displaySearchWrapper(false);
  toggleClass(targetEl, TAG_ACTIVE_CLASS);
}
//================================================

window.addEventListener("click", (event) => {
  const targetEl = event.target;

  const tagName = targetEl.tagName;

  // console.log(tagName);

  if (tagName === "BUTTON") {
    const targetText = targetEl.innerHTML.trim();
    const searchContentEl = document.getElementById("search-content");
    const searchBarTags = getSearchBarTags(targetText, searchContentEl);

    if (targetEl.id === "clear" || !searchBarTags.length) {
      resetState(searchContentEl);
      return;
    }

    setSearchbarContent(searchContentEl, searchBarTags);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
    displaySearchWrapper(searchBarTags.length > 0);
    FiterJobsListings(searchBarTags);
  }
});

FiterJobsListings();
