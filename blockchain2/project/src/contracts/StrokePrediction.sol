// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StrokePrediction {
    struct Patient {
        uint256 age;
        bool gender; // true for male, false for female
        bool hypertension;
        bool heartDisease;
        uint256 bmi;
        uint256 glucoseLevel;
        bool smokingStatus;
        uint256 riskScore;
        string recommendation;
        uint256 timestamp;
    }
    
    mapping(address => Patient) public patients;
    mapping(address => bool) public authorizedHealthcareProviders;
    address public owner;
    
    event RiskAssessed(address indexed patient, uint256 riskScore, uint256 timestamp);
    event HealthcareProviderAuthorized(address provider);
    
    constructor() {
        owner = msg.sender;
        authorizedHealthcareProviders[msg.sender] = true;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }
    
    modifier onlyAuthorized() {
        require(authorizedHealthcareProviders[msg.sender], "Not authorized");
        _;
    }
    
    function authorizeProvider(address provider) public onlyOwner {
        authorizedHealthcareProviders[provider] = true;
        emit HealthcareProviderAuthorized(provider);
    }
    
    function assessStrokeRisk(
        address patientAddress,
        uint256 age,
        bool gender,
        bool hypertension,
        bool heartDisease,
        uint256 bmi,
        uint256 glucoseLevel,
        bool smokingStatus
    ) public onlyAuthorized returns (uint256) {
        uint256 riskScore = 0;
        
        // Risk calculation logic
        if (age > 65) riskScore += 20;
        if (hypertension) riskScore += 15;
        if (heartDisease) riskScore += 15;
        if (bmi > 30) riskScore += 10;
        if (glucoseLevel > 126) riskScore += 10;
        if (smokingStatus) riskScore += 10;
        
        string memory recommendation;
        if (riskScore >= 50) {
            recommendation = "High risk: Immediate medical consultation required";
        } else if (riskScore >= 30) {
            recommendation = "Moderate risk: Regular check-ups recommended";
        } else {
            recommendation = "Low risk: Maintain healthy lifestyle";
        }
        
        patients[patientAddress] = Patient(
            age,
            gender,
            hypertension,
            heartDisease,
            bmi,
            glucoseLevel,
            smokingStatus,
            riskScore,
            recommendation,
            block.timestamp
        );
        
        emit RiskAssessed(patientAddress, riskScore, block.timestamp);
        return riskScore;
    }
    
    function getPatientData(address patientAddress) 
        public 
        view 
        returns (Patient memory) 
    {
        require(
            msg.sender == patientAddress || 
            authorizedHealthcareProviders[msg.sender],
            "Unauthorized access"
        );
        return patients[patientAddress];
    }
}