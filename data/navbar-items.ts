export const navbarItems = [
   { 
     name: "Home", 
     path: "/",
     type: "link"
   },
   { 
     name: "About us", 
     path: "/about",
     type: "link"
   },
   { 
     name: "Courses", 
     path: "/courses",
     type: "dropdown",
     items: [
       { title: "Web Development", path: "/courses/web-dev" },
       { title: "Data Science", path: "/courses/data-science" },
       { title: "Mobile App Development", path: "/courses/mobile-dev" },
     ]
   },
   { 
     name: "Jobs & Scholarships", 
     path: "/jobs",
     type: "link"
   },
   { 
     name: "Language", 
     path: "/language",
     type: "dropdown",
     items: [
       { title: "English", path: "/language/en" },
       { title: "French", path: "/language/fr" },
       { title: "Spanish", path: "/language/es" }
     ]
   },
 ];