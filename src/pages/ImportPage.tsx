import { useState, useRef } from 'react';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ImportPage() {
  const navigate = useNavigate();
  const [templateName, setTemplateName] = useState('');
  const [figmaUrl, setFigmaUrl] = useState('');
  const [illustrationFile, setIllustrationFile] = useState<File | null>(null);
  const [illustrationName, setIllustrationName] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIllustrationSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIllustrationFile(file);
      setIllustrationName(file.name);
    }
  };

  const handleImport = async () => {
    if (!templateName.trim()) return;
    setIsImporting(true);

    await new Promise((r) => setTimeout(r, 600));

    navigate('/editor', {
      state: {
        html: '',
        name: templateName.trim(),
        description: figmaUrl ? `Figma: ${figmaUrl}` : '',
        figmaUrl: figmaUrl.trim() || undefined,
        illustrationName: illustrationName || undefined,
      },
    });
  };

  const canImport = templateName.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-4 shadow-sm">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="h-5 w-px bg-gray-200" />
        <span className="text-sm font-semibold text-gray-700">Import Template</span>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-md px-10 py-10">
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="autoloanprequal_email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Figma URL
            </label>
            <input
              type="url"
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              placeholder="https://www.figma.com/design/"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 bg-white"
            />
          </div>

          <div className="mb-10">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Illustration
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={illustrationName}
                placeholder=""
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white cursor-default"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2.5 border border-gray-300 bg-white text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors flex items-center gap-2"
              >
                <FolderOpen size={15} />
                Select
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.svg"
                onChange={handleIllustrationSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleImport}
              disabled={!canImport || isImporting}
              className="px-8 py-2.5 border border-gray-400 bg-white text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isImporting ? 'Importing...' : 'Import Content'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
