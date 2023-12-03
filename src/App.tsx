import { useState } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "index.js",
      content: "console.log()",
      language: "javascript",
      isEditing: false,
    },
  ]);
  const [activeTab, setActiveTab] = useState({
    id: 1,
    name: "index.js",
    content: "console.log()",
    language: "javascript",
    isEditing: true,
  });
  const [inputText, setInputText] = useState('');

  const handleAddFile = () => {
    const newTabId = tabs.length + 1;
    setTabs([
      ...tabs,
      {
        id: newTabId,
        name: "sample.js",
        content: "//edit here",
        language: "javascript",
        isEditing: false,
      },
    ]);
    setActiveTab({
      id: newTabId,
      name: "sample.js",
      content: "//edit here",
      language: "javascript",
      isEditing: true,
    });
  };
  const handleTabChange = (tabClicked) => {
    const currentTab = tabs.find((tab) => tab.id === tabClicked.id);
    if (currentTab) {
      setActiveTab(currentTab);
    }
    console.log(`active ${JSON.stringify(activeTab)}`);
  };
  const handleEditClicked = (tabClicked) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabClicked.id ? { ...tab, isEditing: !tab.isEditing } : tab,
      ),
    );
  };
  const handleEditFilename = (event) => {
    setInputText(event.target.value);
    setTabs(
      tabs.map((tab) =>
        tab.id === tabClicked.id ? { ...tab, isEditing: !tab.isEditing } : tab,
      ),
    );
  };

  return (
    <div className="App flex flex-col w-full h-screen">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">Navbar</div>
      </nav>

      {/* main */}
      <div className="flex w-full h-full overflow-hidden">
        {/* Sidebar */}
        <aside className="w-3/12 bg-gray-100 hidden md:block p-4">
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Files
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
            onClick={handleAddFile}
          >
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              + Add New File
            </h4>
          </button>
          <ul>
            {tabs.map((tab) => (
              <ol key={tab.id} className="my-2">
                {tab.isEditing ? (
                  <>
                    <input
                      type="text"
                      value={tab.name}
                    />
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                      onClick={() => handleEditFilename(tab)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleTabChange(tab)}>
                      {tab.name}
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
                      onClick={() => handleEditClicked(tab)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </ol>
            ))}
          </ul>
        </aside>

        {/* Editor */}
        <main className="w-full h-screen overflow-auto">
          <Editor
            height="75vh"
            width="w-full"
            theme="vs-dark"
            path={activeTab.name}
            defaultLanguage={activeTab.language}
            defaultValue={activeTab.content}
          />
        </main>
        {/* chatroom */}
        {/* <aside className="w-52 bg-gray-100 hidden md:block p-4">
          <div>chat</div>
        </aside> */}
      </div>
    </div>
  );
}

export default App;
