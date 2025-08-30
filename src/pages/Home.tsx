import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container">
      <div className="jumbotron py-5">
        <h1 className="display-4">Welcome to Maviz MLM Platform</h1>
        <p className="lead">
          Join our revolutionary MLM platform and earn rewards through our matrix system.
          Purchase MVZx tokens and get positioned in our 2x2 binary matrix.
        </p>
        <hr className="my-4" />
        <p>
          Get started with 0.5 free MVZx tokens when you sign up and start earning today!
        </p>
        
        {!isAuthenticated ? (
          <div className="mt-4">
            <Link className="btn btn-primary btn-lg me-3" to="/signup">
              Sign Up Now
            </Link>
            <Link className="btn btn-outline-primary btn-lg" to="/login">
              Login
            </Link>
          </div>
        ) : (
          <div className="mt-4">
            <Link className="btn btn-primary btn-lg me-3" to="/dashboard">
              Go to Dashboard
            </Link>
            <Link className="btn btn-outline-primary btn-lg" to="/purchase">
              Purchase Tokens
            </Link>
          </div>
        )}
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Matrix System</h3>
              <p className="card-text">
                Our 2x2 binary matrix system ensures fair distribution of rewards.
                Move through stages and earn as your network grows.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Staking Rewards</h3>
              <p className="card-text">
                Stake your MVZx tokens and earn 100% APY over 150 days.
                Watch your investment grow with our competitive staking program.
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h3 className="card-title">Multiple Payment Options</h3>
              <p className="card-text">
                Purchase MVZx tokens using USDT (BEP-20), Flutterwave Naira payments,
                or manual bank transfers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
