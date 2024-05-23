import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';


function IndexContent() {
    return (
        <div>
            <main className="page-content" aria-label="Content">
                <div className="wrapper">
                    <div className="container heading-container">
                        <div>
                            <h1>Kam Lasater</h1>
                            <h3>Software Entrepreneur</h3>
                            <br />
                        </div>
                    </div>
                </div>

                <div className="wrapper">
                    <div className="container intro-container">
                        <h2>About Me</h2>
                        {/* <span className="profile-img" style={{ backgroundImage: 'url(/static/kam-lasater.png)' }}></span> */}
                        <p>I build and grow things.</p>
                        <p>
                            In professional life that means software and software companies. In personal
                            life that means I am a husband, father of four boys and gardener outside of
                            Philadelphia PA. Mornings you can find me running, lifting or rolling bjj.
                        </p>
                        <br />
                    </div>

                    <div className="container experience-container">
                        <h2>Experience</h2>
                        <br />

                        <div>
                            <h3>Cyclic (<a href="//www.cyclic.sh" target="_blank" rel="noopener noreferrer" className="link">www.cyclic.sh</a>)</h3>
                            <p><b>CEO / Cofounder</b></p>
                            <p>January 2021 - present</p>
                            <ul>
                                <li>Full stack javascript/python apps</li>
                                <li>From idea to 150k+ developers</li>
                                <li>Hosted PaaS built by team of 2</li>
                            </ul>
                        </div>
                        <br />

                        <div>
                            <h3>Black Knight Financial Services (<a href="//bkfs.com" target="_blank" rel="noopener noreferrer" className="link">bkfs.com</a>)</h3>
                            <p><b>Senior Development Manager</b></p>
                            <p>June 2018 - April 2020</p>
                            <ul>
                                <li>Serverless AI product launched with 3 of top 10 US banks</li>
                                <li>Migrated to serverless build system</li>
                                <li>9 AWS Certifications in 14 months</li>
                                <li>Completed PCI SAQ-d process with assessor</li>
                                <li>Grew Engineering team from 6 to 19 engineers</li>
                                <li>Managed transition of Product POC to remote team of 8+ engineers</li>
                            </ul>
                        </div>
                        <br />

                        <div>
                            <h3>HeavyWater (<a href="//heavywater.com" target="_blank" rel="noopener noreferrer" className="link">heavywater.com</a>)</h3>
                            <p><b>Chief Technology Officer</b></p>
                            <p>January 2018 - June 2018 (acquired)</p>
                            <ul>
                                <li>Grew dev team from 3 to 6</li>
                                <li>Managed development of core AI technology</li>
                            </ul>
                        </div>
                        <br />


                        <div>
                            <h3>LegalScience (<a href="//legalscience.com" target="_blank" class="link">legalscience.com</a>)</h3>
                            <p><b>Chief Executive Officer</b></p>
                            <p>April 2017 - December 2017</p>
                            <ul>
                                <li>Closed first commercial data deal</li>
                                <li>Awarded 2+ million dollar SBIR grant</li>
                                <li>Implemented sales and marketing tracking tools</li>
                                <li>Implemented modern CICD practices</li>
                            </ul>
                        </div>
                        <br />


                        <div>
                            <h3>New Haven Bank (<a href="//newhavenbank.com" target="_blank" class="link">newhavenbank.com</a>)</h3>
                            <p><b>Board Member</b></p>
                            <p>October 2012 - April 2015</p>
                            <ul>
                                <li>Board member of FDIC insured community bank</li>
                                <li>Member of Audit commitee</li>
                                <li>Member of Compensation commitee</li>
                            </ul>
                        </div>
                        <br />


                        <div>
                            <h3>SeeClickFix (<a href="//seeclickfix.com" target="_blank" class="link">seeclickfix.com</a>)</h3>
                            <p><b>Cofounder</b></p>
                            <p>January 2008 - October 2019 (acquired)</p>
                            <ul>
                                <li>From idea to successful cash exit</li>
                                <li>Raised seed and two institutional rounds</li>
                                <li>Developed SaaS business model</li>
                            </ul>
                        </div>
                        <br />


                        <div>
                            <h3>HigherOne (<a href="//higherone.com" target="_blank" class="link">higherone.com</a>)</h3>
                            <p><b>Software Engineer and Software Architect</b></p>
                            <p>June 2003 - April 2010 (IPO)</p>
                            <ul>
                                <li>Early engineer to IPO</li>
                                <li>Helped grow company from 20 to 400 employees</li>
                                <li>Helped grow fintech product from $1M ARR to $100M ARR</li>
                                <li>Technical lead on two acquisitions</li>
                            </ul>
                        </div>
                        <br />
                    </div>

                    <div class="container education-container">
                        <h2>Education</h2>
                        <br />
                        <h3>Carnegie Mellon University</h3>
                        <p><b>BS Electrical and Computer Engineering</b></p>
                        <p>1999 - 2003</p>
                        <ul>
                            <li>I focused on the interface between hardware and software.</li>
                            <li>Course work: Operating Systems, Embedded Systems, Advanced Digital Design and Advanced Prototyping Lab</li>
                            <li>Teaching Assistant: Embedded Systems and Advanced Digital Design</li>
                            <li>Languages: C, Verilog, Java</li>
                            <li>Tools: XEmacs, Make, CVS</li>
                        </ul>
                    </div>


                    <br />

                    <div class="container talks-container">
                        <h2>Talks</h2>
                        <br />

                        <ul>
                            <li>Serverless Days NYC June 2022 (<a href="//www.youtube.com/watch?v=MFDy6AkMHEo">youtube.com/watch?v=MFDy6AkMHEo</a>)</li>
                            <li>Devops Days Boston September 2022 (<a href="//www.youtube.com/watch?v=253eJpL4cpw">youtube.com/watch?v=253eJpL4cpw</a>)</li>
                        </ul>
                        <br />
                    </div>

                    <div class="container certifications-container">
                        <h2>Certifications - Active</h2>
                        <br />
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="b64098ff-1aeb-4953-a71e-07fded203deb" data-share-badge-host="https://www.credly.com"></div>
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="19647a32-6e16-4821-aaf3-0b9e3251c4f2" data-share-badge-host="https://www.credly.com"></div>
                        <br />
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="0ca5c340-103c-4670-ae7e-22d294717b20" data-share-badge-host="https://www.credly.com"></div>
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="8473411d-6abf-4a08-a8db-3b4ef8f3fc27" data-share-badge-host="https://www.credly.com"></div>
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="94cdb014-270e-4943-970a-63c0b49da021" data-share-badge-host="https://www.credly.com"></div>

                        <h2>Certifications - Previous</h2>
                        <br />
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="6660ad38-47d8-49a3-bbaf-aa3ce462d6ee" data-share-badge-host="https://www.credly.com"></div>
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="21b185d5-6032-4d99-8cb6-e0c59b46f7b6" data-share-badge-host="https://www.credly.com"></div>
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="b8fde6f7-87d6-4a54-a760-a3a6c572acbb" data-share-badge-host="https://www.credly.com"></div>
                        <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="a83f5537-9cf8-4805-86c0-9fb43ef60a1b" data-share-badge-host="https://www.credly.com"></div>

                        <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
                    </div>
                </div>

            </main>

            <div className="container footer-container">
                <p>Kam Lasater - <a href="mailto:ckl@seekayel.com" target="_blank" rel="noopener noreferrer">ckl@seekayel.com</a></p>
            </div>
            <script src="/assets/js/index.js"></script>
        </div>
    );
};

export default function Index() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout
            title="Home"
            description="Resume">
            <main>
                <IndexContent />
            </main>
        </Layout>
    );
}