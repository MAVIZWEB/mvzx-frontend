import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";

export default function MatrixTree() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/dashboard">
            <Button variant="outline">← Back to Dashboard</Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Matrix Tree View</h1>
        </div>
        
        <Card className="p-6 text-center">
          <div className="text-white/70 mb-4">
            Matrix tree visualization coming soon...
          </div>
          <div className="text-sm text-white/50">
            This feature will show your complete matrix structure with positions and earnings.
          </div>
        </Card>
      </div>
    </div>
  );
}
