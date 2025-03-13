import "./LandingPage.css";
import { useEffect, useState } from "react";

export default function LandingPage() {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/rentals")
          .then((res) => res.json())
          .then((data) => setRentals(data))
          .catch((error) => console.error("Error fetching rentals:", error));
    }, []);

    return (
        <div className="landing-container">
            <nav className="navbar">
                <h1>MoF Rentals</h1>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#rentals">Rentals</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <header className="hero">
                <h2>Find Your Perfect Rental</h2>
                <p>Browse our collection of available rentals.</p>
            </header>

            <section id="rentals" className="rentals-section">
                <h2>Available Rentals</h2>
                <div className="rentals-list">
                    {rentals.length > 0 ? (
                        rentals.map((rental) => (
                        <div key={rental._id} className="rental-card">
                            <img 
                                src={rental.imageUrl} 
                                alt={`${rental.firstName}'s rental`} 
                                className="rental-image"
                            />
                            <h3>{rental.firstName}'s Rental</h3>
                            <p>Age: {rental.age}</p>
                            <p>Price: ${rental.price}</p>
                            <p>{rental.description}</p>
                        </div>
                        ))
                    ) : (
                        <p>Loading rentals...</p>
                    )}
                </div>
            </section>
        </div>
    );
}
