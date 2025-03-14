import React, { useState } from 'react';
import { Toolbar } from './components/Toolbar';
import { Canvas } from './components/Canvas';
import { PropertyPanel } from './components/PropertyPanel';
import { useEditorStore } from './store';
import { Eye, Globe } from 'lucide-react';

function App() {
  const [previewMode, setPreviewMode] = useState(false);
  const elements = useEditorStore((state) => state.elements);

  const handlePreview = () => {
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Preview</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="preview">
            ${document.querySelector('.canvas-content')?.innerHTML || ''}
          </div>
        </body>
        </html>
      `;
      previewWindow.document.write(html);
      previewWindow.document.close();
    }
  };

  const handlePublish = () => {
    // In a real application, this would deploy to a hosting service
    const publishWindow = window.open('', '_blank');
    if (publishWindow) {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Published Site</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body>
          <div id="published">
            ${document.querySelector('.canvas-content')?.innerHTML || ''}
          </div>
        </body>
        </html>
      `;
      publishWindow.document.write(html);
      publishWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">WebCraft</h1>
            <div className="flex space-x-4">
              <button
                onClick={handlePreview}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Globe className="w-4 h-4 mr-2" />
                Publish
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh-4rem)]">
        <Toolbar />
        <Canvas />
        <PropertyPanel />
      </main>
    </div>
  );
}

export default App;