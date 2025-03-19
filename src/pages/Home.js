// import React, { useEffect, useState } from "react";
// import { Container, Card, Button } from "react-bootstrap";
// import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast
// import { useNavigate } from "react-router-dom"; // useNavigate hook for navigation

// const Home = () => {
//   const navigate = useNavigate(); // useNavigate hook ka use karein
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const [userName, setUserName] = useState(''); // State to store user's name

//   // Check if user is logged in on component mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       fetchUserProfile(token);
//     }
//   }, []);

//   // Fetch user profile data
//   const fetchUserProfile = async (token) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/profile`, {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}` },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setIsLoggedIn(true);
//         setUserName(data.name); // Set user's name
//       } else {
//         setIsLoggedIn(false);
//         setUserName('');
//       }
//     } catch (err) {
//       setIsLoggedIn(false);
//       setUserName('');
//     }
//   };

//   // Sign Up button par click karne par toast message show karein
//   const handleSignUpClick = () => {
//     toast.info("Redirecting to Sign Up page...", {
//       autoClose: 2000, // 2 seconds ke baad toast automatically close ho jayega
//     });
//     setTimeout(() => {
//       navigate("/signup"); // 2 seconds ke baad signup page par redirect karein
//     }, 2000);
//   };

//   // Login button par click karne par toast message show karein
//   const handleLoginClick = () => {
//     toast.info("Redirecting to Login page...", {
//       autoClose: 2000, // 2 seconds ke baad toast automatically close ho jayega
//     });
//     setTimeout(() => {
//       navigate("/login"); // 2 seconds ke baad login page par redirect karein
//     }, 2000);
//   };

//   // Logout button par click karne par user ko logout karein
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Token remove karein
//     setIsLoggedIn(false); // Login status update karein
//     setUserName(''); // User name clear karein
//     toast.success("Logged out successfully!"); // Success toast show karein
//   };

//   return (
//     <div
//       className="d-flex flex-column"
//       style={{ minHeight: "80vh", paddingTop: "56px", paddingBottom: "56px" }} // Adjusting for navbar & footer
//     >
//       <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
//         <Card
//           className="text-center shadow-lg p-4"
//           style={{ maxWidth: "500px", borderRadius: "12px" }}
//         >
//           <Card.Body>
//             <Card.Title
//               style={{
//                 fontSize: "1.75rem",
//                 fontWeight: "bold",
//                 color: "#333",
//               }}
//             >
//               Welcome to{" "}
//               <span style={{ color: "#007bff" }}>Personalized Learning</span>{" "}
//               Platform
//             </Card.Title>
//             <Card.Text className="text-muted" style={{ fontSize: "1.1rem" }}>
//               "Your journey to better learning starts here!"
//             </Card.Text>
//             <div className="mt-4">
//               {isLoggedIn ? (
//                 // Logged in state: Show Welcome message and Logout button
//                 <div>
//                   <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
//                     Welcome, {userName}!
//                   </p>
//                   <Button
//                     variant="danger"
//                     className="px-4 py-2"
//                     style={{ borderRadius: "6px" }}
//                     onClick={handleLogout}
//                   >
//                     Logout Now
//                   </Button>
//                 </div>
//               ) : (
//                 // Logged out state: Show Sign Up and Login buttons
//                 <div>
//                   <Button
//                     variant="primary"
//                     className="px-4 py-2"
//                     style={{ borderRadius: "6px" }}
//                     onClick={handleSignUpClick}
//                   >
//                     Sign Up
//                   </Button>
//                   <Button
//                     variant="success"
//                     className="ms-3 px-4 py-2"
//                     style={{ borderRadius: "6px" }}
//                     onClick={handleLoginClick}
//                   >
//                     Login
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </Card.Body>
//         </Card>
//       </Container>
//       <ToastContainer /> {/* ToastContainer ko add karein */}
//     </div>
//   );
// };

// export default Home;

import React, { useCallback, useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player"; // Import react-player

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const API_BASE_URL = process.env.REACT_APP_API_URL;
  const fetchUserProfile = useCallback(async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        setUserName(data.name);
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    } catch (err) {
      setIsLoggedIn(false);
      setUserName('');
    }
  },[API_BASE_URL]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, [fetchUserProfile]);



  const handleSignUpClick = () => {
    toast.info("Redirecting to Sign Up page...", {
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/signup");
    }, 2000);
  };

  const handleLoginClick = () => {
    toast.info("Redirecting to Login page...", {
      autoClose: 2000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    toast.success("Logged out successfully!");
  };

  return (
    <div
      className="d-flex flex-column"
      style={{ minHeight: "80vh", paddingTop: "56px", paddingBottom: "56px" }}
    >
      {/* Background Video */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Ensure video stays in the background
          overflow: "hidden",
        }}
      >
        <ReactPlayer
          url="https://youtu.be/A-wi-zrMlzE?si=Syky6J2jBY_Z8vO3" // Video URL
          playing={true} // Autoplay
          loop={true} // Loop the video
          muted={true} // Mute the video
          width="100%"
          height="100%"
          style={{
            objectFit: "cover", // Ensure video covers the entire background
          }}
        />
      </div>

      <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Card
          className="text-center shadow-lg p-4"
          style={{ maxWidth: "500px", borderRadius: "12px", backgroundColor: "rgba(255, 255, 255, 0.9)" }} // Add transparency to card
        >
          <Card.Body>
            <Card.Title
              style={{
                fontSize: "1.75rem",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Welcome to{" "}
              <span style={{ color: "#007bff" }}>Personalized Learning</span>{" "}
              Platform
            </Card.Title>
            <Card.Text className="text-muted" style={{ fontSize: "1.1rem" }}>
              "Your journey to better learning starts here!"
            </Card.Text>
            <div className="mt-4">
              {isLoggedIn ? (
                <div>
                  <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                    Welcome, {userName}!
                  </p>
                  <Button
                    variant="danger"
                    className="px-4 py-2"
                    style={{ borderRadius: "6px" }}
                    onClick={handleLogout}
                  >
                    Logout Now
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    variant="primary"
                    className="px-4 py-2"
                    style={{ borderRadius: "6px" }}
                    onClick={handleSignUpClick}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="success"
                    className="ms-3 px-4 py-2"
                    style={{ borderRadius: "6px" }}
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Home;