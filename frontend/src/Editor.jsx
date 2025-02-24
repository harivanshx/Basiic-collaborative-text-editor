import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const socket = io('http://localhost:5000');

const copyToClipboard = () => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl)
    .then(() => alert('URL copied to clipboard!'))
    .catch((err) => console.error('Failed to copy URL:', err));
};

function Editor() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  useEffect(() => {
    socket.emit('joinDocument', id);
    axios.get(`http://localhost:5000/api/docs/${id}`).then((res) => setContent(res.data.content));

    socket.on('receiveChanges', (newContent) => setContent(newContent));
    return () => {
      socket.off('receiveChanges');
      socket.emit('leaveDocument', id);
    };
  }, [id]);

  const handleChange = (e) => {
    setContent(e.target.value);
    socket.emit('sendChanges', { docId: id, content: e.target.value });
  };

  const applyFormatting = (tag) => {
    const textarea = document.getElementById('editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.slice(start, end);

    if (selectedText) {
      let formattedText;
      if (tag === 'bold') {
        formattedText = isBold ? selectedText : `**${selectedText}**`;
        setIsBold((prev) => !prev);
      } else if (tag === 'italic') {
        formattedText = isItalic ? selectedText : `*${selectedText}*`;
        setIsItalic((prev) => !prev);
      }

      const newContent = content.slice(0, start) + formattedText + content.slice(end);
      setContent(newContent);
      socket.emit('sendChanges', { docId: id, content: newContent });
    }
  };

  return (
    <>
      <h1 style={{ color: 'blue', fontSize: '2rem', textAlign: 'center', margin: '20px 0' }}>
        Text Editor
      </h1>

      <button 
        onClick={copyToClipboard} 
        style={{                       
          display: 'block',
          margin: '20px auto',
          padding: '10px 20px',
          fontSize: '1rem',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Copy URL to Clipboard
      </button>


      <textarea 
        id="editor"
        value={content} 
        onChange={handleChange} 
        rows={10} 
        cols={50} 
        style={{ 
          color: 'black', 
          fontSize: '1rem', 
          textAlign: 'left', 
          height: '40vh', 
          width: '90%', 
          maxWidth: '1200px', 
          minHeight: '300px', 
          margin: '0 auto', 
          display: 'block', 
          padding: '10px', 
          boxSizing: 'border-box',
          border: '2px solid #ccc', 
          borderRadius: '8px', 
          outline: 'none', 
          resize: 'none' 
        }} 
      />

      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Markdown Preview:</h2>
      <div style={{ padding: '10px', border: '2px solid #ccc', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </>
  );
}

export default Editor;
