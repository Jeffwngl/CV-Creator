import { useState } from 'react'
import './App.css'

interface inputItem {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}

interface Resume {
  name: string;
  email: string;
  contacts: string[];
  experiences: inputItem[];
  skills: string[];
}

// App

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState<string[]>([]);
  const [input, setInput] = useState<inputItem[]>([]);
  const [skill, setSkill] = useState<string[]>([]);
  const [submit, setSubmit] = useState<Resume>({name: '', email: '', contacts: [], experiences: [], skills: []}); // resume updates when submit is pressed

  // for experience
  const addInput = () => {
    if (input.length < 10) {
      setInput([...input, { text1: '', text2: '', text3: '', text4: '' }]);
    }
  };

  // for contacts
  const addContact = () => {
    if (contact.length < 3) {
      setContact([...contact, '']);
    }
  }

  // for skills
  const addSkill = () => {
    setSkill([...skill, '']);
  }

  const handleContactChange = (index: number, value: string) => {
    const newContacts = [...contact];
    newContacts[index] = value;
    setContact(newContacts); 
  }

  const handleExpChange = (index: number, key: keyof inputItem, value: string) => {
    const newInputs = [...input];
    newInputs[index][key] = value;
    setInput(newInputs);
  };

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skill];
    newSkills[index] = value;
    setSkill(newSkills);
  }

  // submit buttons

  const handleContactSubmit = () => {
    setSubmit((prev) => ({...prev, name: name}));
    setSubmit((prev) => ({...prev, email: email}));
    setSubmit((prev) => ({...prev, contacts: contact}));
  }

  const handleExperienceSubmit = () => {
    setSubmit((prev) => ({...prev, experiences: input}))
  }

  const handleSkillSubmit = () => {
    setSubmit((prev) => ({...prev, skills: skill}))
  }

  // remove buttons

  const handleContactRemove = () => {
    if (contact.length >= 1) {
      setContact(contact.slice(0, contact.length - 1));
    }
    if (contact.length == 1) {
      setContact([]);
    }
  }

  const handleExperienceRemove = () => {
    if (input.length >= 1) {
      setInput(input.slice(0, input.length - 1));
    }
    if (input.length == 1) {
      setInput([]);
    }
  }

  const handleSkillRemove = () => {
    if (skill.length >= 1) {
      setSkill(skill.slice(0, skill.length - 1));
    }
    if (skill.length == 1) {
      setSkill([]);
    }
  }

  return (
    <>
      <div className='header'>
        <h1>CV Creator</h1>
      </div>

      {/* Email and Contacts */}
      <div className='details'>
        <p>Enter your name:</p>
        <input
          type='text'
          placeholder='Type here...'
          name={name}
          onChange={(event) => setName(event.target.value)}
        />
        <p>Enter your email:</p>
        <input
          type='text'
          placeholder='Type here...'
          name={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <> 
          <div className='space2'>
            {contact.map((input, index) => (
              <input
                key={index}
                type='text'
                value={input}
                onChange={(event) => handleContactChange(index, event.target.value)}
                placeholder={`New Contact...`}
                />
            ))}
          </div>
          <button onClick={addContact} className='addContact'>+</button>
        </>
        <button onClick={handleExperienceRemove} className='remove1'>Remove</button>
        <button onClick={handleContactSubmit} className="submit1">Submit</button>
      </div>


      {/* Experience */}
      <div className='experience'>
        <p>Enter your work experience:</p>
        <>
          <div className='space1'>
            {input.map((input, index) => (
              <div key={index} className='newExperience'>
                <input
                  type='text'
                  value={input.text1}
                  onChange={(event) => handleExpChange(index, 'text1', event.target.value)}
                  placeholder={`Experience ${index + 1}`}
                  className = 'task' 
                  />
                <input
                  type='text'
                  value={input.text2}
                  onChange={(event) => handleExpChange(index, 'text2', event.target.value)}
                  placeholder={`Position...`}
                  className = 'position' 
                  />
                <div className='interval'>
                  <input
                    type='text'
                    value={input.text3}
                    onChange={(event) => handleExpChange(index, 'text3', event.target.value)}
                    placeholder={`From...`}
                    className='fromYear'
                    />
                  <input
                    type='text'
                    value={input.text4}
                    onChange={(event) => handleExpChange(index, 'text4', event.target.value)}
                    placeholder={`To...`}
                    className='toYear'
                    />
                </div>
              </div>
            ))}
          </div>
          <button onClick={addInput} className='addExperience'>+</button>
        </>
        <button onClick={handleExperienceSubmit} className='remove2'>Remove</button>
        <button onClick={handleExperienceSubmit} className='submit2'>Submit</button>
      </div>
      
      {/* Skills */}
      <div className='skills'>
        <p>Enter your skills:</p>
        <> 
          <div className='space2'>
            {skill.map((skill, index) => (
              <input
                key={index}
                type='text'
                value={skill}
                onChange={(event) => handleSkillChange(index, event.target.value)}
                placeholder={`Skill ${index + 1}`}
                />
            ))}
          </div>
          <button onClick={addSkill} className='addSkill'>+</button>
        </>
        <button onClick={handleSkillRemove} className='remove3'>Remove</button>
        <button onClick={handleSkillSubmit} className='submit3'>Submit</button>
      </div>

      <div className='CV'>
        <p>Your Resume:</p>
      </div>
      
      {/* Resume */}
      <div className='resume'>
        <div className='resumeHeader'>
          <h3 className='heading'>Resume</h3>
          <div className='contactHeader'>
            <h2 className='nameHeader'>{submit.name}</h2>
            <p className='emailHeader'>{submit.email}</p>
            <div className='extra'>
              <p className='title'>Other Contacts:</p>
              {submit.contacts.map((contact, index) => (
                <ul className='listItems' key={index}>{contact}</ul>
              ))}
            </div>
          </div>
        </div>
        <div className='resumeContents'>
          <h3>Experience</h3>
          <div className='listContents'>
            {submit.experiences.map((exp, index) => (
              <div key={index} className='experienceList'>
                <p><strong>Company:</strong> {exp.text1}</p>
                <p><strong>Position:</strong> {exp.text2}</p>
                <p className='duration'><strong>From:</strong> {exp.text3}</p>
                <p className='duration'><strong>To:</strong> {exp.text4}</p>
              </div>
            ))}
          </div>
          <h3>Skills</h3>
          <div className='listContents'>
            <div className='skillsContents'>
              {submit.skills.map((skeel, index) => (
                <p>- {skeel}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
