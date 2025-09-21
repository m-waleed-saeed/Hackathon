import React, { useState } from 'react';
import { Input, Collapse, theme } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Panel } = Collapse;

const FAQPage = () => {
  const { token } = theme.useToken();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // FAQ data organized by categories
  const faqCategories = [
    {
      title: "General Information",
      questions: [
        {
          question: "Who can participate in the hackathon?",
          answer: "Typically open to students, professionals, or hobbyists aged 18+, with any skill level; check the event's specific eligibility page."
        },
        {
          question: "When and where will it take place?",
          answer: "The hackathon will be held on [Date] at [Venue/Location]. Virtual participation options are also available for remote attendees."
        }
      ]
    },
    {
      title: "Registration & Teams",
      questions: [
        {
          question: "Can teams be any size?",
          answer: "Most events cap team size (e.g., 2–4 members). Some allow solo entrants. Confirm the official rules."
        },
        {
          question: "Can I participate individually?",
          answer: "Yes, individual participation is allowed. You'll have the opportunity to form teams during the event if you wish."
        },
        {
          question: "How do I register?",
          answer: "Registration can be completed through our website. Click on the 'Register' button and fill out the required information."
        }
      ]
    },
    {
      title: "Hackathon Rules & Format",
      questions: [
        {
          question: "What is the project scope?",
          answer: "Projects should align with the theme or problem statement; avoid disallowed topics and ensure the idea is feasible within the time limit."
        },
        {
          question: "What can we build?",
          answer: "Any executable software, hardware, or combined solution that runs during the event and meets the judging criteria."
        },
        {
          question: "Are there prohibited tools or platforms?",
          answer: "Generally no, but some hackathons restrict pre-existing code, data sources, or require use of provided APIs; check the rules."
        },
        {
          question: "Can we use pre-existing code or APIs?",
          answer: "Often allowed if you can clearly credit sources and it's within allowed use; some events restrict proprietary code or require fresh development."
        }
      ]
    },
    {
      title: "Judging & Prizes",
      questions: [
        {
          question: "How is judging conducted?",
          answer: "Teams present a live demo and/or slide deck to judges who score based on criteria like impact, technical difficulty, usability, and originality."
        },
        {
          question: "What are the judging criteria?",
          answer: "Common criteria include Innovation/Impact, Technical Difficulty, Usability/UX, Feasibility, and Presentation/Demonstration. Weight varies by event."
        },
        {
          question: "Are there awards or prizes?",
          answer: "Yes, with categories like Grand Prize, Best Use of Tech, Audience Favorite, or Theme-specific awards; prize rules are in the official guidelines."
        }
      ]
    },
    {
      title: "Logistics & Support",
      questions: [
        {
          question: "Are mentors or resources provided?",
          answer: "Many hackathons offer mentors, office hours, APIs, datasets, and cloud credits; some resources may be limited or require registration."
        },
        {
          question: "What about demos and presentations?",
          answer: "Most formats require a live demonstration, a short slide deck, and sometimes a poster or pitch. Practice timing to fit limits."
        },
        {
          question: "Is there a code of conduct?",
          answer: "Yes. Most events require respectful behavior, anti-harassment, accessibility considerations, and safe work environments. Violations may lead to disqualification."
        }
      ]
    }
  ];

  // Filter FAQs based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const panelStyle = {
    marginBottom: 16,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our hackathon event. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="mb-8">
          <Input
            size="large"
            placeholder="Search FAQs..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg"
          />
        </div>

        {filteredCategories.length > 0 ? (
          <div className="space-y-6">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                  <h2 className="text-xl font-semibold text-blue-800">{category.title}</h2>
                </div>
                <Collapse 
                  bordered={false} 
                  defaultActiveKey={['0']}
                  expandIconPosition="end"
                  className="bg-white"
                >
                  {category.questions.map((item, index) => (
                    <Panel 
                      key={index} 
                      header={item.question} 
                      style={panelStyle}
                      className="text-lg font-medium text-gray-900"
                    >
                      <p className="text-gray-600 pl-6">{item.answer}</p>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <SearchOutlined style={{ fontSize: '48px' }} />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No results found</h3>
            <p className="text-gray-500">
              Try different search terms or browse the categories above
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">We're here to help. Get in touch with our support team.</p>
            <button onClick={() => navigate('/contact-us')} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;