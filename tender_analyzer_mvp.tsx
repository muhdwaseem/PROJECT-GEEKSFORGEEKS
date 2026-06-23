import React, { useState, useRef, useEffect } from 'react';

// Inline SVGs for all professional Lucide-style icons to ensure zero-dependency reliability
const Icons = {
  Upload: () => (
    <svg className="w-12 h-12 text-indigo-400 mb-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  ),
  FileText: ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Chat: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  ),
  Summary: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Search: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Copy: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  ),
  Trash: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.24 9m4.768-2.123l-.88 14.003A9.04 9.04 0 0112 18.75a9.04 9.04 0 01-2.86-.47L8.26 6.877m1.5-1.374V4.636c0-1.019.81-1.867 1.833-1.867h.707c1.022 0 1.833.848 1.833 1.867v1.03C14.75 5.513 15.68 5.672 16.5 6M9 6h6" />
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Info: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.063.852l-.708 2.836a.75.75 0 001.063.852l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  Bot: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h.01M15 9h.01M9 14h6" />
    </svg>
  ),
  Send: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  Refresh: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  ChevronDown: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  Target: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  Download: ({ className = "w-4 h-4" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  Spinner: ({ className = "w-6 h-6 animate-spin text-indigo-600" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
};

export default function App() {
  // Parsing & File State
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileType, setFileType] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Structured Summary States
  const [summaryData, setSummaryData] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportFeedback, setExportFeedback] = useState('');
  
  // UI Accordion States for Summary Sections
  const [openSections, setOpenSections] = useState({
    profile: true,
    parties: true,
    payment: true,
    penalties: true,
    deadlines: true,
    deliverables: true,
    redFlags: true,
  });

  // UI state
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'summary'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeHighlight, setActiveHighlight] = useState(''); // Target click matching string
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Chat MVP Interaction State
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'assistant',
      text: "👋 Welcome to Tender Analyzer! Upload a tender document (PDF or DOCX) in the left panel. Once parsed, I will assist you with context-aware analysis.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);

  // Suggested prompt templates
  const suggestions = [
    { label: "Summarize criteria", query: "Give me a structured summary of the key evaluation and eligibility criteria." },
    { label: "Timeline & Deadlines", query: "List all key deadlines, milestones, and contract timeline requirements." },
    { label: "Deliverables", query: "What are the exact deliverables, reports, or services required by this tender?" },
    { label: "Risk Factors", query: "Are there any liabilities, strict penalty clauses, or obvious risks mentioned?" }
  ];

  // Dynamic references for parser scripts
  const scriptsLoaded = useRef(false);
  const chatEndRef = useRef(null);
  const documentViewerRef = useRef(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiResponding]);

  // Scroll to active highlight in Left Panel when updated
  useEffect(() => {
    if (activeHighlight) {
      const element = document.getElementById('active-highlight-mark');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeHighlight]);

  // Dynamically load external scripts for document parsing & PDF Generation
  useEffect(() => {
    if (scriptsLoaded.current) return;

    // Load PDF.js
    const pdfScript = document.createElement('script');
    pdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js';
    pdfScript.async = true;
    document.body.appendChild(pdfScript);

    // Load Mammoth.js (for DOCX parsing)
    const mammothScript = document.createElement('script');
    mammothScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
    mammothScript.async = true;
    document.body.appendChild(mammothScript);

    // Load jsPDF Core
    const jsPdfScript = document.createElement('script');
    jsPdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    jsPdfScript.async = true;
    document.body.appendChild(jsPdfScript);

    // Load jsPDF-AutoTable Plugin
    const autoTableScript = document.createElement('script');
    autoTableScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.29/jspdf.plugin.autotable.min.js';
    autoTableScript.async = true;
    document.body.appendChild(autoTableScript);

    pdfScript.onload = () => {
      // Set worker path
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
      }
    };

    scriptsLoaded.current = true;
  }, []);

  // Format File Size
  const formatBytes = (bytes, decimals = 2) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // Toggle single accordion section
  const toggleSection = (sectionName) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Parse PDF File
  const parsePDF = async (arrayBuffer) => {
    if (!window.pdfjsLib) {
      throw new Error('PDF parsing engine is still loading. Please try again in a few seconds.');
    }

    setLoadingStep('Initializing PDF engine...');
    setProgress(20);
    const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    setLoadingStep(`Extracting text from ${pdf.numPages} pages...`);
    setProgress(50);

    let parsedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      parsedText += `[Page ${i}]\n${pageText}\n\n`;
      setProgress(50 + Math.floor((i / pdf.numPages) * 45));
    }

    return parsedText;
  };

  // Parse DOCX File
  const parseDOCX = async (arrayBuffer) => {
    if (!window.mammoth) {
      throw new Error('Word document parsing engine is still loading. Please try again in a few seconds.');
    }

    setLoadingStep('Mammoth engine running file conversion...');
    setProgress(40);
    const result = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
    setProgress(90);
    return result.value;
  };

  // Handle file processing
  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    setErrorMsg('');
    setSummaryData(null);
    setSummaryError('');
    setActiveHighlight('');
    setIsLoading(true);
    setProgress(10);
    setLoadingStep('Reading file stream...');

    const extension = selectedFile.name.split('.').pop().toLowerCase();
    setFileName(selectedFile.name);
    setFileSize(selectedFile.size);
    setFileType(extension);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        let textResult = '';

        if (extension === 'pdf') {
          textResult = await parsePDF(arrayBuffer);
        } else if (extension === 'docx') {
          textResult = await parseDOCX(arrayBuffer);
        } else {
          throw new Error('Unsupported format. Please upload a PDF or DOCX file.');
        }

        if (!textResult || textResult.trim().length === 0) {
          throw new Error('Could not extract legible text. The document might be fully scanned image content.');
        }

        setExtractedText(textResult);
        setProgress(100);
        setLoadingStep('Extraction successful!');

        // Add automated system announcement in chat
        setChatMessages([
          {
            sender: 'assistant',
            text: `📁 "${selectedFile.name}" has been successfully imported and parsed (${(textResult.split(/\s+/).length).toLocaleString()} words). \n\nI have fully ingested this specification. I am now automatically generating your dynamic Extracted Summary dashboard. You can also chat with me below!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);

        // Automatically trigger summary extraction
        runSummaryExtraction(textResult);

      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || 'An error occurred while parsing the file.');
        resetState();
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 800);
      }
    };

    reader.onerror = () => {
      setErrorMsg('Failed to read file from storage.');
      setIsLoading(false);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  // State Resetter
  const resetState = () => {
    setFile(null);
    setFileName('');
    setFileSize(0);
    setFileType('');
    setExtractedText('');
    setSearchQuery('');
    setSummaryData(null);
    setSummaryError('');
    setActiveHighlight('');
    setChatMessages([
      {
        sender: 'assistant',
        text: "👋 Welcome to Tender Analyzer! Upload a tender document (PDF or DOCX) in the left panel. Once parsed, I will assist you with context-aware analysis.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Drag-and-drop Events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const ext = droppedFile.name.split('.').pop().toLowerCase();
      if (ext === 'pdf' || ext === 'docx') {
        processFile(droppedFile);
      } else {
        setErrorMsg('Invalid file type. Please upload a valid PDF or DOCX file.');
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Clipboard Copier
  const copyToClipboard = () => {
    document.execCommand('copy'); 
    navigator.clipboard.writeText(extractedText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  // Filtered & Highlighted text calculation
  const getHighlightedText = () => {
    // Priority 1: Specific summary-clicked active highlight
    if (activeHighlight) {
      const parts = extractedText.split(new RegExp(`(${escapeRegExp(activeHighlight)})`, 'i'));
      return (
        <>
          {parts.map((part, index) => 
            part.toLowerCase() === activeHighlight.toLowerCase() ? (
              <mark key={index} id="active-highlight-mark" className="bg-amber-300 text-slate-900 rounded px-1.5 py-0.5 font-semibold ring-2 ring-amber-500 animate-pulse">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </>
      );
    }

    // Priority 2: Generic text search bar
    if (searchQuery) {
      const parts = extractedText.split(new RegExp(`(${escapeRegExp(searchQuery)})`, 'gi'));
      return (
        <>
          {parts.map((part, index) => 
            part.toLowerCase() === searchQuery.toLowerCase() ? (
              <mark key={index} className="bg-yellow-200 text-slate-900 rounded-sm px-0.5 font-semibold">
                {part}
              </mark>
            ) : (
              part
            )
          )}
        </>
      );
    }

    return extractedText;
  };

  // Regex string escaper helper
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Gemini API Fetch with Exponential Backoff
  const callGeminiWithRetry = async (payload, maxRetries = 5) => {
    const apiKey = ""; // Injected dynamically at runtime by environment
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    let delay = 1000;
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          return data;
        }

        if (response.status !== 429 && response.status < 500) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
        }
      } catch (err) {
        if (attempt === maxRetries - 1) {
          throw err;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  };

  // Run the Structured Summary Extractor with native responseSchema
  const runSummaryExtraction = async (textPayload) => {
    if (!textPayload) return;

    setIsSummarizing(true);
    setSummaryError('');
    setActiveHighlight('');

    try {
      // Define target OpenAPI compliance response schema with source excerpts added
      const summarySchema = {
        type: "OBJECT",
        properties: {
          parties: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                name: { type: "STRING" },
                role: { type: "STRING" }
              },
              required: ["name", "role"]
            }
          },
          contract_value: { type: "STRING" },
          currency: { type: "STRING" },
          payment_terms: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                description: { type: "STRING" },
                due: { type: "STRING" }
              },
              required: ["description", "due"]
            }
          },
          penalty_clauses: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                description: { type: "STRING" },
                amount_or_rate: { type: "STRING" },
                trigger_condition: { type: "STRING" },
                source_excerpt: { type: "STRING" } // Exact quote from the source
              },
              required: ["description", "amount_or_rate", "trigger_condition", "source_excerpt"]
            }
          },
          deadlines: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                milestone: { type: "STRING" },
                date_or_duration: { type: "STRING" }
              },
              required: ["milestone", "date_or_duration"]
            }
          },
          deliverables: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                description: { type: "STRING" }
              },
              required: ["description"]
            }
          },
          governing_law: { type: "STRING" },
          termination_clauses: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                description: { type: "STRING" }
              },
              required: ["description"]
            }
          },
          red_flags: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                description: { type: "STRING" },
                severity: { type: "STRING" }, // "low" | "medium" | "high"
                source_excerpt: { type: "STRING" } // Exact quote from the source
              },
              required: ["description", "severity", "source_excerpt"]
            }
          }
        },
        required: [
          "parties", "contract_value", "currency", "payment_terms", 
          "penalty_clauses", "deadlines", "deliverables", "governing_law", 
          "termination_clauses", "red_flags"
        ]
      };

      const systemPrompt = `You are a contract/tender analysis engine. Extract the relevant fields from the document text below according to the provided schema. If a field isn't present in the document, return an empty array or empty string. Do not hallucinate values.

For each penalty clause and red flag, also include the exact verbatim sentence or clause reference from the document in the source_excerpt field.`;

      const promptPayload = `DOCUMENT TEXT:\n${textPayload}`;

      const payload = {
        contents: [
          {
            parts: [{ text: promptPayload }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: summarySchema
        }
      };

      const result = await callGeminiWithRetry(payload);
      const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        throw new Error("No payload returned from the summary extraction engine.");
      }

      const parsedJSON = JSON.parse(textResponse);
      setSummaryData(parsedJSON);

    } catch (err) {
      console.error("Structured extraction failed: ", err);
      setSummaryError(err.message || "An error occurred during structured analysis. Please retry.");
    } finally {
      setIsSummarizing(false);
    }
  };

  // Generate Branded PDF Report of the Extracted Summary
  const exportToPDF = () => {
    if (!summaryData) return;
    setIsExporting(true);
    setExportFeedback('Compiling report elements...');

    setTimeout(() => {
      try {
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
          throw new Error("PDF generator script failed to initialize correctly. Please reload page.");
        }

        const doc = new jsPDF('p', 'mm', 'a4');
        const pageColor = '#0f172a'; // Slate-900 / Deep Navy
        const accentColor = '#4f46e5'; // Indigo-600

        // Cover styling / Decorative Bar
        doc.setFillColor(pageColor);
        doc.rect(0, 0, 210, 18, 'F');

        // Document Title
        doc.setTextColor('#ffffff');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text("TENDER ANALYSIS EXECUTIVE REPORT", 14, 11);

        // Subtitle Meta info
        doc.setTextColor('#64748b'); // Slate-500
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 25);
        doc.text(`Source Document: ${fileName}`, 14, 29);

        let verticalPos = 37;

        // Block Profile Table
        doc.setFillColor('#f8fafc');
        doc.rect(14, verticalPos, 182, 22, 'F');
        doc.setDrawColor('#cbd5e1');
        doc.rect(14, verticalPos, 182, 22, 'S');

        doc.setTextColor('#334155');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text("ESTIMATED CONTRACT VALUE", 20, verticalPos + 7);
        doc.text("CURRENCY", 90, verticalPos + 7);
        doc.text("GOVERNING LAW", 145, verticalPos + 7);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#0f172a');
        doc.setFontSize(11);
        doc.text(summaryData.contract_value || "Not Specified", 20, verticalPos + 15);
        doc.text(summaryData.currency || "Not Specified", 90, verticalPos + 15);
        doc.text(summaryData.governing_law || "Not Specified", 145, verticalPos + 15);

        verticalPos += 30;

        // Custom AutoTable Helper Function
        const renderSectionTable = (title, headers, rows) => {
          doc.setTextColor(accentColor);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.text(title.toUpperCase(), 14, verticalPos);
          verticalPos += 3;

          doc.autoTable({
            startY: verticalPos,
            head: [headers],
            body: rows,
            theme: 'striped',
            headStyles: { fillColor: '#1e293b', textColor: '#ffffff', fontSize: 9, fontStyle: 'bold' },
            bodyStyles: { fontSize: 8, textColor: '#334155' },
            margin: { left: 14, right: 14 },
            styles: { overflow: 'linebreak', cellWidth: 'auto' },
            didDrawPage: (data) => {
              verticalPos = data.cursor.y + 10;
            }
          });
        };

        // 1. Contracting Parties
        if (summaryData.parties && summaryData.parties.length > 0) {
          const rows = summaryData.parties.map(p => [p.name || 'Unknown', p.role || 'Unassigned']);
          renderSectionTable("Contracting Parties", ["Party Name", "Assigned / Executing Role"], rows);
        }

        // 2. Payment terms
        if (summaryData.payment_terms && summaryData.payment_terms.length > 0) {
          const rows = summaryData.payment_terms.map(pt => [pt.description || '', pt.due || 'Immediate']);
          renderSectionTable("Payment Terms & Schedules", ["Clause Description", "Due Date / Milestone Event"], rows);
        }

        // Check if verticalPos is close to page overflow
        if (verticalPos > 240) { doc.addPage(); verticalPos = 20; }

        // 3. Milestones and Deadlines
        if (summaryData.deadlines && summaryData.deadlines.length > 0) {
          const rows = summaryData.deadlines.map(d => [d.milestone || '', d.date_or_duration || 'Ongoing']);
          renderSectionTable("Timeline & Deliverable Deadlines", ["Milestone Event", "Date or Duration Constraint"], rows);
        }

        if (verticalPos > 240) { doc.addPage(); verticalPos = 20; }

        // 4. Required Deliverables
        if (summaryData.deliverables && summaryData.deliverables.length > 0) {
          const rows = summaryData.deliverables.map(del => [del.description || '']);
          renderSectionTable("Core Deliverables", ["Required Service / Technical Report Description"], rows);
        }

        if (verticalPos > 240) { doc.addPage(); verticalPos = 20; }

        // 5. Penalties and Liabilities
        if (summaryData.penalty_clauses && summaryData.penalty_clauses.length > 0) {
          const rows = summaryData.penalty_clauses.map(pc => [
            pc.description || '',
            pc.amount_or_rate || 'Unspecified',
            pc.trigger_condition || '',
            pc.source_excerpt || 'N/A'
          ]);
          renderSectionTable("Liabilities & Penalty Clauses", ["Clause Description", "Rate/Amount", "Trigger Condition", "Grounding Quote Reference"], rows);
        }

        if (verticalPos > 240) { doc.addPage(); verticalPos = 20; }

        // 6. Red Flags
        if (summaryData.red_flags && summaryData.red_flags.length > 0) {
          const rows = summaryData.red_flags.map(rf => [
            rf.description || '',
            (rf.severity || 'low').toUpperCase(),
            rf.source_excerpt || 'N/A'
          ]);
          renderSectionTable("Risk Assessment & Red Flags", ["Analyzed Concern", "Severity", "Verbatim Tender Segment"], rows);
        }

        // Footer note
        if (verticalPos > 270) { doc.addPage(); verticalPos = 20; }
        doc.setTextColor('#94a3b8');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'italic');
        doc.text("Disclaimer: This summary report is automatically compiled through AI analysis. Please verify clauses with expert legal guidance.", 14, verticalPos + 5);

        // Download file trigger
        doc.save(`Tender_Analysis_Report_${fileName.replace(/\.[^/.]+$/, "")}.pdf`);
        setExportFeedback("Exported Successfully!");
      } catch (err) {
        console.error("Export generation error: ", err);
        setExportFeedback(`Export Failed: ${err.message}`);
      } finally {
        setTimeout(() => {
          setIsExporting(false);
          setExportFeedback('');
        }, 2500);
      }
    }, 400);
  };

  // Interactive message submit via real Gemini Integration
  const sendMessageToGemini = async (textToSend) => {
    if (!textToSend.trim() || !extractedText) return;

    const userMessage = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [...chatMessages, userMessage];
    setChatMessages(updatedHistory);
    setIsAiResponding(true);

    try {
      const systemPrompt = `You are a contract analysis assistant. You have been given the full text of a tender/contract document below. Answer the user's questions ONLY based on this document. If the answer isn't in the document, say so clearly. Always cite which section or clause you're referencing when possible.

DOCUMENT TEXT:
${extractedText}`;

      const formattedContents = updatedHistory
        .filter(msg => msg.sender === 'user' || msg.sender === 'assistant')
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const payload = {
        contents: formattedContents,
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      };

      const result = await callGeminiWithRetry(payload);
      const aiReplyText = result.candidates?.[0]?.content?.parts?.[0]?.text || "No legible response obtained from the analysis engine.";

      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: aiReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `⚠️ **Analysis Connection Error**: ${err.message || "Failed to contact analysis server. Please check your network and try again."}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiResponding) return;
    
    const inputMsg = chatInput;
    setChatInput('');
    sendMessageToGemini(inputMsg);
  };

  // Statistical calculations from extracted text
  const wordCount = extractedText ? extractedText.split(/\s+/).filter(Boolean).length : 0;
  const charCount = extractedText ? extractedText.length : 0;
  const paragraphCount = extractedText ? extractedText.split(/\n\s*\n/).filter(Boolean).length : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <header className="bg-slate-900 text-white shadow-md px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-lg shadow-inner">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Tender Analyzer</h1>
            <p className="text-xs text-slate-400 font-medium">Enterprise Contract Analysis & Ingestion Engine</p>
          </div>
        </div>

        {fileName && (
          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 animate-fade-in text-xs md:text-sm">
            <span className="p-1.5 rounded bg-indigo-500/20 text-indigo-300">
              <Icons.FileText className="w-5 h-5" />
            </span>
            <div className="text-left max-w-xs md:max-w-sm">
              <p className="font-semibold text-slate-200 truncate">{fileName}</p>
              <p className="text-xs text-slate-400">{formatBytes(fileSize)} &bull; {fileType.toUpperCase()}</p>
            </div>
            <button
              onClick={resetState}
              className="text-slate-400 hover:text-rose-400 p-1.5 rounded transition duration-150 hover:bg-slate-700 ml-2"
              title="Remove File"
            >
              <Icons.Trash className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-[calc(100vh-80px)] overflow-hidden">
        
        {/* LEFT PANEL: Document Reader / Upload Zone */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-indigo-100 text-indigo-700">
                <Icons.FileText className="w-5 h-5" />
              </span>
              <h2 className="font-semibold text-slate-800">Tender Specification</h2>
            </div>
            {extractedText && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 bg-slate-200/60 px-2 py-1 rounded font-medium">
                  {wordCount.toLocaleString()} words
                </span>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded transition border border-indigo-200"
                >
                  {copied ? <Icons.Check className="w-3.5 h-3.5 text-emerald-500" /> : <Icons.Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Plaintext'}
                </button>
              </div>
            )}
          </div>

          {/* Core Content Box */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            
            {/* 1. Empty / Drag-and-Drop state */}
            {!extractedText && !isLoading && (
              <div 
                className={`flex-1 flex flex-col items-center justify-center p-8 transition-all ${
                  dragActive ? 'bg-indigo-50/70 border-2 border-dashed border-indigo-400' : 'bg-white'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="max-w-md w-full text-center flex flex-col items-center">
                  <div className="p-4 bg-indigo-50 rounded-full mb-4">
                    <Icons.Upload />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Upload tender documents</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                    Drag and drop your PDF or DOCX procurement file here. Text extraction will process 100% locally in your client environment.
                  </p>
                  
                  {errorMsg && (
                    <div className="w-full mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-start gap-2 text-left">
                      <Icons.Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <div>{errorMsg}</div>
                    </div>
                  )}

                  <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-150 shadow-md inline-block">
                    Select File
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.docx" 
                      onChange={handleFileInput}
                    />
                  </label>
                  <p className="text-xs text-slate-400 mt-3">Maximum file recommended size: 35MB</p>
                </div>
              </div>
            )}

            {/* 2. Extraction/Loading Stage */}
            {isLoading && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50">
                <div className="max-w-xs w-full text-center">
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center">
                    <Icons.Spinner className="w-10 h-10 animate-spin text-indigo-600 mb-4" />
                    <h4 className="font-semibold text-slate-800 text-sm mb-1">Parsing Document</h4>
                    <p className="text-xs text-indigo-600 font-medium mb-4">{loadingStep}</p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Text Reader Active State */}
            {extractedText && !isLoading && (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Search / Filter Sub-bar */}
                <div className="p-3 border-b border-slate-100 bg-slate-50/30 flex flex-wrap items-center justify-between gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icons.Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Filter or find text inside tender..."
                      value={searchQuery}
                      onChange={(e) => {
                        setActiveHighlight(''); // Clear active click target highlight on manual search
                        setSearchQuery(e.target.value);
                      }}
                      className="w-full pl-9 pr-8 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                    />
                    {(searchQuery || activeHighlight) && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setActiveHighlight('');
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  
                  {activeHighlight && (
                    <div className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-md flex items-center gap-1.5 animate-fade-in shrink-0">
                      <Icons.Target className="w-3.5 h-3.5 animate-bounce text-amber-600" />
                      <span>Showing Linked Excerpt</span>
                      <button 
                        onClick={() => setActiveHighlight('')} 
                        className="font-bold hover:text-amber-900 ml-1 text-[10px]"
                      >
                        [Clear]
                      </button>
                    </div>
                  )}
                </div>

                {/* Text Viewport */}
                <div 
                  ref={documentViewerRef} 
                  className="flex-1 overflow-y-auto p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed text-slate-700 whitespace-pre-wrap select-text selection:bg-indigo-200 bg-slate-50/20"
                >
                  {getHighlightedText()}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* RIGHT PANEL: Tabbed Workspace */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-full">
          
          {/* Tabs Controller */}
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition duration-150 ${
                activeTab === 'chat'
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              <Icons.Chat className="w-4 h-4" />
              Interactive Chat
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition duration-150 ${
                activeTab === 'summary'
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
              }`}
            >
              <Icons.Summary className="w-4 h-4" />
              Extracted Summary
            </button>
          </div>

          {/* TAB VIEWPORTS */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tab: Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/40">
                
                {/* Chat Feed */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-normal">
                  {chatMessages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                    >
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-none'
                      }`}>
                        <div className="whitespace-pre-line">{msg.text}</div>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {/* Typing / Thinking indicator */}
                  {isAiResponding && (
                    <div className="flex flex-col max-w-[85%] mr-auto items-start animate-pulse">
                      <div className="px-4 py-3 rounded-2xl text-sm bg-white text-slate-500 border border-slate-200/85 rounded-tl-none flex items-center gap-2">
                        <Icons.Bot className="w-4 h-4 text-indigo-500 animate-bounce" />
                        <span>Analyzing document context...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggested Chips when document is loaded */}
                {extractedText && (
                  <div className="px-4 py-2 border-t border-slate-100 bg-white/70 flex gap-2 overflow-x-auto no-scrollbar">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => !isAiResponding && sendMessageToGemini(sug.query)}
                        disabled={isAiResponding}
                        className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 transition whitespace-nowrap disabled:opacity-50"
                      >
                        {sug.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Tray */}
                <form onSubmit={handleFormSubmit} className="p-4 border-t border-slate-200/80 bg-white flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={extractedText ? "Ask any analytical question..." : "Please upload a document to analyze..."}
                    disabled={!extractedText || isAiResponding}
                    className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || !extractedText || isAiResponding}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition duration-150 shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed shrink-0 flex items-center gap-1.5"
                  >
                    <Icons.Send className="w-4 h-4" />
                    <span>Ask</span>
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Extracted Summary */}
            {activeTab === 'summary' && (
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50/50 space-y-4">
                
                {/* Header Profile Controls */}
                {extractedText && (
                  <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Analysis Control Deck</h3>
                      <p className="text-xs text-slate-500">Structured parameters extracted via Gemini Schema validation.</p>
                    </div>
                    
                    <div className="flex gap-2 shrink-0">
                      {/* NEW: Export PDF Summary */}
                      {summaryData && (
                        <button
                          onClick={exportToPDF}
                          disabled={isExporting}
                          className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition disabled:opacity-50"
                        >
                          {isExporting ? (
                            <Icons.Spinner className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <Icons.Download className="w-3.5 h-3.5" />
                          )}
                          <span>{exportFeedback || 'Export PDF Report'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => runSummaryExtraction(extractedText)}
                        disabled={isSummarizing}
                        className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition disabled:opacity-50"
                      >
                        {isSummarizing ? (
                          <Icons.Spinner className="w-3.5 h-3.5" />
                        ) : (
                          <Icons.Refresh className="w-3.5 h-3.5" />
                        )}
                        <span>{isSummarizing ? 'Analyzing...' : 'Regenerate'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {isSummarizing && (
                  <div className="py-12 flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
                    <Icons.Spinner className="w-8 h-8 text-indigo-600" />
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800">Synthesizing Structural Parameters...</p>
                      <p className="text-xs text-slate-400 max-w-xs mt-1 px-4">Parsing clauses, matching deadlines, and cataloging potential risks via Gemini JSON schema pipeline.</p>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {summaryError && !isSummarizing && (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-start gap-2">
                    <Icons.Info className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <p className="font-bold">Summary Extraction Failed</p>
                      <p className="mt-1">{summaryError}</p>
                      <button
                        onClick={() => runSummaryExtraction(extractedText)}
                        className="mt-2 text-indigo-600 font-bold hover:underline"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}

                {/* Extracted Accordions Panel */}
                {!isSummarizing && summaryData && (
                  <div className="space-y-3">

                    {/* 1. CONTRACT VALUE & LAWS PROFILE */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('profile')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-emerald-100 text-emerald-800">💰</span>
                          Value & Governing Jurisdiction
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.profile ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.profile && (
                        <div className="p-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-slate-50 p-3 rounded border border-slate-100">
                            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimated Value</span>
                            <span className="text-base font-extrabold text-slate-800">{summaryData.contract_value || "Not Explicitly Specified"}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded border border-slate-100">
                            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Currency</span>
                            <span className="text-base font-extrabold text-slate-800">{summaryData.currency || "Not Specified"}</span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded border border-slate-100">
                            <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Governing Jurisdiction</span>
                            <span className="text-base font-extrabold text-slate-800">{summaryData.governing_law || "Not Specified"}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 2. PARTIES & ROLES */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('parties')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-indigo-100 text-indigo-800">👥</span>
                          Involved Parties
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.parties ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.parties && (
                        <div className="p-4 border-t border-slate-100">
                          {summaryData.parties && summaryData.parties.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {summaryData.parties.map((party, idx) => (
                                <div key={idx} className="p-3 rounded-lg border border-slate-150 bg-slate-50 flex flex-col">
                                  <span className="font-bold text-slate-800 text-sm">{party.name || "Unknown Name"}</span>
                                  <span className="text-xs text-indigo-600 font-semibold mt-0.5 uppercase tracking-wide">{party.role || "Unassigned Role"}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No specific contracting parties or roles identified.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 3. PAYMENT TERMS */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('payment')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-cyan-100 text-cyan-800">💳</span>
                          Payment Schedules & Milestones
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.payment ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.payment && (
                        <div className="p-4 border-t border-slate-100">
                          {summaryData.payment_terms && summaryData.payment_terms.length > 0 ? (
                            <div className="space-y-3">
                              {summaryData.payment_terms.map((term, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 rounded border border-slate-200/60 flex flex-col md:flex-row justify-between gap-2">
                                  <span className="text-xs text-slate-700 leading-relaxed max-w-xl">{term.description}</span>
                                  {term.due && (
                                    <span className="text-[10px] uppercase font-extrabold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-100 self-start md:self-center shrink-0">
                                      Due: {term.due}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No custom payment milestones or constraints found.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 4. DEADLINES & SCHEDULES */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('deadlines')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-orange-100 text-orange-800">📅</span>
                          Critical Dates & Milestones
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.deadlines ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.deadlines && (
                        <div className="p-4 border-t border-slate-100">
                          {summaryData.deadlines && summaryData.deadlines.length > 0 ? (
                            <div className="space-y-2.5">
                              {summaryData.deadlines.map((dl, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200/60 gap-4">
                                  <div className="flex gap-2.5 items-start">
                                    <span className="bg-orange-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">
                                      {idx + 1}
                                    </span>
                                    <span className="text-xs font-semibold text-slate-800">{dl.milestone}</span>
                                  </div>
                                  <span className="text-xs text-orange-700 font-extrabold bg-orange-50 px-2 py-0.5 rounded border border-orange-100 shrink-0">
                                    {dl.date_or_duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No specific timeline schedules cataloged in this tender.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 5. SPECIFIC DELIVERABLES */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('deliverables')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-purple-100 text-purple-800">📦</span>
                          Required Deliverables
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.deliverables ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.deliverables && (
                        <div className="p-4 border-t border-slate-100">
                          {summaryData.deliverables && summaryData.deliverables.length > 0 ? (
                            <div className="grid grid-cols-1 gap-2">
                              {summaryData.deliverables.map((del, idx) => (
                                <div key={idx} className="flex gap-2.5 p-3 bg-slate-50 rounded border border-slate-200/60">
                                  <span className="text-slate-400 mt-0.5 shrink-0">•</span>
                                  <span className="text-xs text-slate-700 leading-relaxed">{del.description}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No detailed reports or specific deliverables found.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 6. PENALTY CLAUSES */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('penalties')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-rose-100 text-rose-800">⚠️</span>
                          Strict Penalties & Liabilities
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.penalties ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.penalties && (
                        <div className="p-4 border-t border-slate-100">
                          {summaryData.penalty_clauses && summaryData.penalty_clauses.length > 0 ? (
                            <div className="space-y-3">
                              {summaryData.penalty_clauses.map((clause, idx) => (
                                <div 
                                  key={idx} 
                                  onClick={() => clause.source_excerpt && setActiveHighlight(clause.source_excerpt)}
                                  className={`p-3 rounded border transition duration-200 flex flex-col gap-2 cursor-pointer ${
                                    activeHighlight === clause.source_excerpt 
                                      ? 'bg-amber-50/80 border-amber-400 shadow-md ring-1 ring-amber-400' 
                                      : 'bg-rose-50/30 border-rose-100 hover:border-rose-300 hover:shadow-sm'
                                  }`}
                                  title="Click to locate verbatim segment in specification"
                                >
                                  <div className="flex justify-between items-start gap-2">
                                    <span className="text-xs font-semibold text-rose-950 leading-relaxed">{clause.description}</span>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      {clause.amount_or_rate && (
                                        <span className="text-[10px] uppercase font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                                          Rate: {clause.amount_or_rate}
                                        </span>
                                      )}
                                      <span className="p-1 rounded bg-slate-100 text-slate-500 hover:text-indigo-600" title="Locate Excerpt">
                                        <Icons.Target className="w-3.5 h-3.5" />
                                      </span>
                                    </div>
                                  </div>
                                  {clause.trigger_condition && (
                                    <div className="text-[11px] text-slate-500 bg-white/80 px-2 py-1.5 rounded border border-slate-100 mt-1">
                                      <span className="font-semibold text-slate-700">Trigger Condition:</span> {clause.trigger_condition}
                                    </div>
                                  )}
                                  {clause.source_excerpt && (
                                    <div className="text-[10px] italic text-slate-500 border-l-2 border-indigo-200 pl-2 py-0.5 mt-1 bg-indigo-50/20">
                                      <span className="font-semibold not-italic text-indigo-700 block mb-0.5">Verbatim Grounding Quote:</span>
                                      "{clause.source_excerpt}"
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No severe custom penalty clauses or rate structures detected.</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 7. RISK ASSESSMENT (RED FLAGS) */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleSection('redFlags')}
                        className="w-full px-4 py-3 flex items-center justify-between bg-slate-50/60 font-bold text-sm text-slate-700 hover:bg-slate-50 transition"
                      >
                        <span className="flex items-center gap-2">
                          <span className="p-1 rounded bg-red-100 text-red-800">🚩</span>
                          Risk Assessment (Red Flags)
                        </span>
                        <Icons.ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openSections.redFlags ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {openSections.redFlags && (
                        <div className="p-4 border-t border-slate-100">
                          {summaryData.red_flags && summaryData.red_flags.length > 0 ? (
                            <div className="space-y-2.5">
                              {summaryData.red_flags.map((flag, idx) => {
                                const isHigh = flag.severity?.toLowerCase() === 'high';
                                const isMed = flag.severity?.toLowerCase() === 'medium';
                                
                                return (
                                  <div 
                                    key={idx} 
                                    onClick={() => flag.source_excerpt && setActiveHighlight(flag.source_excerpt)}
                                    className={`p-3 rounded-lg border flex flex-col gap-2 transition duration-200 cursor-pointer ${
                                      activeHighlight === flag.source_excerpt 
                                        ? 'bg-amber-50 border-amber-400 shadow-md ring-1 ring-amber-400' 
                                        : isHigh 
                                        ? 'bg-rose-50/50 border-rose-150 hover:border-rose-300 hover:shadow-sm' 
                                        : isMed 
                                        ? 'bg-amber-50/50 border-amber-150 hover:border-amber-300 hover:shadow-sm' 
                                        : 'bg-slate-50 border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                                    }`}
                                    title="Click to locate verbatim risk excerpt in specification"
                                  >
                                    <div className="flex items-start gap-3 justify-between">
                                      <div className="flex gap-2">
                                        <span className="mt-0.5 text-xs">⚠️</span>
                                        <span className="text-xs text-slate-700 leading-relaxed font-semibold">{flag.description}</span>
                                      </div>
                                      <div className="flex items-center gap-1.5 shrink-0">
                                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full border ${
                                          isHigh 
                                            ? 'text-rose-700 bg-rose-50 border-rose-200' 
                                            : isMed 
                                            ? 'text-amber-700 bg-amber-50 border-amber-200' 
                                            : 'text-slate-600 bg-slate-100 border-slate-200'
                                        }`}>
                                          {flag.severity || 'low'} Risk
                                        </span>
                                        <span className="p-1 rounded bg-slate-150/70 text-slate-500 hover:text-indigo-600">
                                          <Icons.Target className="w-3.5 h-3.5" />
                                        </span>
                                      </div>
                                    </div>
                                    {flag.source_excerpt && (
                                      <div className="text-[10px] italic text-slate-500 border-l-2 border-indigo-200 pl-2 py-0.5 mt-1 bg-indigo-50/20">
                                        <span className="font-semibold not-italic text-indigo-700 block mb-0.5">Verbatim Grounding Quote:</span>
                                        "{flag.source_excerpt}"
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-xs text-slate-400 italic">No distinct contractual red-flags identified.</p>
                          )}
                        </div>
                      )}
                    </div>

                  </div>
                )}

                {/* Empty Upload State */}
                {!extractedText && !isSummarizing && (
                  <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-xl border border-dashed border-slate-200 p-8 shadow-sm">
                    <div className="p-4 bg-indigo-50 rounded-full mb-3 text-indigo-600">
                      <Icons.FileText className="w-8 h-8" />
                    </div>
                    <p className="text-sm text-slate-800 font-bold mb-1">Extracted Summary Pending</p>
                    <p className="text-xs text-slate-400 max-w-xs leading-normal">
                      Once you upload a tender specification in the left panel, the AI will perform a structured JSON analysis of all terms, values, risks, and deadlines.
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>
        </section>

      </main>
    </div>
  );
}