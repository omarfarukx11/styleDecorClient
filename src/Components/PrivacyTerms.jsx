import React from 'react';

const PrivacyTerms = () => {
    return (
        <section className="py-16 bg-primary text-base-200 min-h-screen">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-12">
                
                {/* Navigation Sidebar */}
                <div className="md:w-1/4">
                    <div className="sticky top-24 space-y-4">
                        <h3 className="text-xl font-bold border-b border-white/10 pb-2 text-cyan-400">Legal Info</h3>
                        <nav className="flex flex-col gap-2 opacity-70">
                            <a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                            <a href="#terms" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                            <a href="#cookies" className="hover:text-cyan-400 transition-colors">Cookie Policy</a>
                        </nav>
                    </div>
                </div>

                {/* Content Area */}
                <div className="md:w-3/4 space-y-12">
                    <div id="privacy">
                        <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
                        <div className="prose prose-invert max-w-none opacity-80 leading-relaxed">
                            <p>At Style Decor, we prioritize your privacy. We collect information such as your name, email, and browsing behavior to improve your experience and process your orders.</p>
                            <h4 className="text-white mt-4 font-bold">Data Security</h4>
                            <p>We use industry-standard encryption to protect your personal data during transmission and storage.</p>
                        </div>
                    </div>

                    <div id="terms" className="pt-12 border-t border-white/10">
                        <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
                        <div className="prose prose-invert max-w-none opacity-80 leading-relaxed">
                            <p>By using our website, you agree to comply with our terms. This includes respecting our intellectual property and using the site for lawful purposes only.</p>
                            <ul className="list-disc pl-5 space-y-2 mt-4">
                                <li>All decor designs are property of Style Decor.</li>
                                <li>Prices are subject to change without notice.</li>
                                <li>Shipping times are estimates, not guarantees.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrivacyTerms;