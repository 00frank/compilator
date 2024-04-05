import CodeMirror from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';

const CodeInfo = ({ tokens, ast }) => {
  return (
    <div className="pt-2 flex gap-2 flex-col lg:flex-row">
      <div>
        <h3 className="text-xl">Tokens</h3>
        <CodeMirror
          editable={false}
          height="256px"
          className="block w-[400px]"
          theme={basicDark}
          value={!!tokens ? JSON.stringify(tokens, null, 2) : "[]"} />
      </div>
      <div>
        <h3 className="text-xl">AST</h3>
        <CodeMirror
          editable={false}
          height="256px"
          className="block w-[400px]"
          theme={basicDark}
          value={!!ast ? JSON.stringify(ast, null, 2) : "[]"} />
      </div>
    </div>
  )
}

export default CodeInfo