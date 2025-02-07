import { useState } from 'react'
import './App.css'

// Name and Email

function NameInput() {
  const [name, setName] = useState("");

  return (
    <input
      type='text'
      placeholder='Type here...'
      name={name}
      onChange={(event) => setName(event.target.value)}
    />
  )
}

function EmailInput() {
  const [email, setEmail] = useState("");
  return (
    <input
      type='text'
      placeholder='Type here...'
      name={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  )
}

// General input function

function AddInput() {
  const [input, setInput] = useState<string[]>([]);
  // this is to add a new input box
  const addInput = () => {
    if (input.length < 3) {
      setInput([...input, '']);
    }
  }
  // this is to make sure the values in the the input box change when the user types
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...input];
    newInputs[index] = value;
    setInput(newInputs); 
  }

  return (
    <> 
      <div className='space2'>
        {input.map((input, index) => (
          <input
            key={index}
            type='text'
            value={input}
            onChange={(event) => handleInputChange(index, event.target.value)}
            placeholder={`New Contact...`}
            />
        ))}
      </div>
      <button onClick={addInput} className='addContact'>+</button>
    </>
  )
}

// Experience section

interface inputItem {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}

function AddExperience({onChange}: {onChange: (values: inputItem[]) => void}) {
  const [input, setInput] = useState<inputItem[]>([]);

  const addInput = () => {
    if (input.length < 10) {
      setInput([...input, { text1: '', text2: '', text3: '', text4: '' }]);
    }
  };

  const handleExpChange = (index: number, key: keyof inputItem, value: string) => {
    const newInputs = [...input];
    newInputs[index][key] = value;
    setInput(newInputs);
    onChange(newInputs);
  };

  return (
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
  )
}

// Skills section

function AddSkill() {
  const [skill, setSkill] = useState<string[]>([]);

  const addSkill = () => {
    setSkill([...skill, '']);
  }

  const handleSkillChange = (index: number, value: string) => {
    const newSkills = [...skill];
    newSkills[index] = value;
    setSkill(newSkills); 
  }

  return (
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
  )
}

// function Resume({details}: {details: any}) {
//   return ()
// }

function AddInfo() {
  const [input, setInput] = useState('');

  const changeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }
  return (
    <>
      <p>{input}</p>
    </>
  )
}

// App

function App() {
  return (
    <>
      <AddInfo />
      <div className='header'>
        <h1>CV Creator</h1>
      </div>
      <div className='details'>
        <p>Enter your name:</p>
        <NameInput />
        <p>Enter your email:</p>
        <EmailInput />
        <AddInput />
        <button className="submit1">
          Submit
        </button>
      </div>

      <div className='experience'>
        <p>Enter your work experience:</p>
        <AddExperience />
        <button className='submit2'>Submit</button>
      </div>

      <div className='skills'>
        <p>Enter your skills:</p>
        <AddSkill />
        <button className='submit3'>Submit</button>
      </div>

      <div className='CV'>
        <p>Your Resume:</p>
      </div>

      <div className='resume'>
        <div className='resumeHeader'>

        </div>
        <div className='resumeContents'>

        </div>
      </div>
    </>
  )
}

export default App
