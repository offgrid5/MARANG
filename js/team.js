(function () {
	const teamMembers = [
            {
                id: "johnModal",
                name: "John Mbeki",
                position: "Chief Engineer",
                bio: "20+ years experience in high-voltage systems and renewable energy integration.",
                avatar: "https://placehold.co/400",
                socialLinks: [
                    {icon: "bi-linkedin", url: "#"},
                    {icon: "bi-envelope", url: "#"},
                    {icon: "bi-twitter", url: "#"},
                    {icon: "bi-github", url: "#"}
                ],
                modal: {
                    joined: "Joined: January 2015",
                    bio: "John brings over 20 years of engineering expertise to our company, specializing in high-voltage systems and renewable energy integration. With a career spanning three continents, he has designed and implemented power solutions for major infrastructure projects. John holds multiple patents in energy efficiency technologies and has been recognized with the African Engineering Excellence Award twice for his contributions to sustainable energy solutions.",
                    academic: [
                        "PhD in Electrical Engineering - University of Cape Town, 2005",
                        "MSc in Power Systems - Imperial College London, 2000",
                        "BEng in Electrical Engineering - University of Pretoria, 1998"
                    ],
                    projects: [
                        {name: "Gaborone Power Grid Upgrade", role: "Lead Engineer", year: "2021-2023", value: "$45M"},
                        {name: "Solar Farm Botswana", role: "Technical Director", year: "2019-2021", value: "$120M"},
                        {name: "National Transmission Network", role: "Senior Consultant", year: "2017-2019", value: "$85M"},
                        {name: "Industrial Zone Power Infrastructure", role: "Project Lead", year: "2015-2017", value: "$32M"}
                    ]
                }
            },
            {
                id: "sarahModal",
                name: "Sarah Johnson",
                position: "Project Manager",
                bio: "Specializes in large-scale infrastructure projects with on-time delivery.",
                avatar: "https://placehold.co/400",
                socialLinks: [
                    {icon: "bi-linkedin", url: "#"},
                    {icon: "bi-envelope", url: "#"},
                    {icon: "bi-facebook", url: "#"},
                    {icon: "bi-globe", url: "#"}
                ],
                modal: {
                    joined: "Joined: March 2018",
                    bio: "Sarah is a seasoned project manager with 15 years of experience in overseeing large-scale engineering projects. She has successfully delivered over 30 projects with a combined value exceeding $500 million. Sarah specializes in resource allocation, risk management, and stakeholder communication. Her ability to coordinate multidisciplinary teams has earned her recognition as Project Manager of the Year by the Engineering Institute of Botswana in 2020.",
                    academic: [
                        "MBA in Project Management - University of Botswana, 2015",
                        "BSc in Civil Engineering - University of Witwatersrand, 2007",
                        "Project Management Professional (PMP) - PMI Certification, 2012"
                    ],
                    projects: [
                        {name: "Central District Hospital Electrical", role: "Project Manager", year: "2022-2023", value: "$28M"},
                        {name: "Botswana Rail Electrification", role: "Lead Project Manager", year: "2020-2022", value: "$150M"},
                        {name: "Commercial Hub Power Systems", role: "Project Manager", year: "2019-2020", value: "$45M"}
                    ]
                }
            },
            {
                id: "davidModal",
                name: "David Chabalala",
                position: "Electrical Design Lead",
                bio: "Innovator in sustainable energy solutions and smart grid technologies.",
                avatar: "https://placehold.co/400",
                socialLinks: [
                    {icon: "bi-linkedin", url: "#"},
                    {icon: "bi-envelope", url: "#"},
                    {icon: "bi-twitter", url: "#"},
                    {icon: "bi-stack-overflow", url: "#"}
                ],
                modal: {
                    joined: "Joined: February 2017",
                    bio: "David is a forward-thinking electrical design lead with 12 years of experience in developing sustainable energy solutions and smart grid technologies. He has led the design of over 15 major power distribution networks across Southern Africa, incorporating cutting-edge technologies for grid resilience. David's work on microgrid integration has been published in multiple international engineering journals.",
                    academic: [
                        "MSc in Electrical Engineering - Stellenbosch University, 2010",
                        "BEng in Electrical Engineering - University of Botswana, 2008",
                        "Certified Energy Manager (CEM) - Association of Energy Engineers, 2015"
                    ],
                    projects: [
                        {name: "Smart Grid Implementation Pilot", role: "Lead Designer", year: "2021-2022", value: "$18M"},
                        {name: "National Grid Resilience Upgrade", role: "Design Lead", year: "2019-2021", value: "$75M"},
                        {name: "Rural Electrification Project", role: "Technical Lead", year: "2018-2019", value: "$32M"}
                    ]
                }
            },
            {
                id: "amandaModal",
                name: "Amanda Peters",
                position: "HV Specialist",
                bio: "Expert in high-voltage transmission systems and substation design.",
                avatar: "https://placehold.co/400",
                socialLinks: [
                    {icon: "bi-linkedin", url: "#"},
                    {icon: "bi-envelope", url: "#"},
                    {icon: "bi-instagram", url: "#"},
                    {icon: "bi-globe", url: "#"}
                ],
                modal: {
                    joined: "Joined: June 2019",
                    bio: "Amanda is a certified High Voltage Specialist with 10 years of hands-on experience in transmission systems and substation design. She has overseen the construction of 8 major substations and 500km of high-voltage transmission lines. Amanda's expertise in safety protocols has reduced project incident rates by 40% across all projects she's managed.",
                    academic: [
                        "BEng in Electrical Engineering - University of Cape Town, 2013",
                        "Advanced Diploma in High Voltage Systems - ESKOM Academy, 2016",
                        "Certified Safety Professional (CSP) - Board of Certified Safety Professionals, 2018"
                    ],
                    projects: [
                        {name: "400kV Transmission Line", role: "Lead Engineer", year: "2022-2023", value: "$60M"},
                        {name: "New Central Substation", role: "Project Engineer", year: "2020-2022", value: "$42M"},
                        {name: "Substation Refurbishment Program", role: "Technical Specialist", year: "2019-2020", value: "$28M"}
                    ]
                }
            }
        ];

        // Function to create team member card
        function createTeamCard(member) {
            return `
                <div class="col-xl-3 col-lg-6 col-md-6">
                    <div class="team-card">
                        <div class="avatar-container">
                            <img src="${member.avatar}" alt="${member.name}" class="avatar">
                        </div>
                        <div class="card-body">
                            <h5 class="employee-name" data-bs-toggle="modal" data-bs-target="#${member.id}">${member.name}</h5>
                            <span class="position-badge">${member.position}</span>
                            <p class="bio">${member.bio}</p>
                            <div class="social-links">
                                ${member.socialLinks.map(link => 
                                    `<a href="${link.url}" class="social-icon"><i class="bi ${link.icon}"></i></a>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to create modal
        function createModal(member) {
            return `
                <div class="modal fade" id="${member.id}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Employee Profile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="profile-header">
                                    <img src="${member.avatar}" alt="${member.name}" class="profile-avatar" style="width: 30% !important;">
                                    <div class="profile-info">
                                        <h1>${member.name}</h1>
                                        <div class="profile-position">${member.position}</div>
                                        <div class="joined-date">${member.modal.joined}</div>
                                    </div>
                                </div>
                                
                                <div class="profile-section">
                                    <h3>Professional Bio</h3>
                                    <p>${member.modal.bio}</p>
                                </div>
                                
                                <div class="profile-section">
                                    <h3>Academic History</h3>
                                    <ul>
                                        ${member.modal.academic.map(item => 
                                            `<li><strong>${item}</strong></li>`
                                        ).join('')}
                                    </ul>
                                </div>
                                
                                <div class="profile-section">
                                    <h3>Projects</h3>
                                    <table class="projects-table">
                                        <thead>
                                            <tr>
                                                <th>Project Name</th>
                                                <th>Role</th>
                                                <th>Year</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${member.modal.projects.map(project => 
                                                `<tr>
                                                    <td>${project.name}</td>
                                                    <td>${project.role}</td>
                                                    <td>${project.year}</td>
                                                    <td>${project.value}</td>
                                                </tr>`
                                            ).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Render team members and modals
        document.addEventListener('DOMContentLoaded', function() {
            const teamContainer = document.getElementById('team-container');
            const modalContainer = document.getElementById('modal-container');
            
            teamMembers.forEach(member => {
                // Add card to team container
                teamContainer.innerHTML += createTeamCard(member);
                
                // Add modal to modal container
                modalContainer.innerHTML += createModal(member);
            });
        });
})()