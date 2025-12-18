export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-700 font-medium">Shantanu Ingole</p>
          <div className="flex gap-6 justify-center mt-3">
            <a
              href="https://github.com/shantanuingole"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/shantanu-ingole-9baa42256"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 underline"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            © 2025 Task Manager. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
