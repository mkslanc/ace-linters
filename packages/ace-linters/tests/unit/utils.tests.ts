
import {mergeObjects, convertToUri} from "../../src/utils";
import {expect} from "chai";

describe('mergeObjects', () => {
    it('should merge two objects with priority to first object values', () => {
        const obj1 = { a: 1, b: { c: 3, d: 4 } };
        const obj2 = { b: { c: 5, e: 6 }, f: 7 };
        const expected = { a: 1, b: { c: 3, d: 4, e: 6 }, f: 7 };
        expect(mergeObjects(obj1, obj2)).to.deep.equal(expected);
    });

    it('should merge arrays within the objects', () => {
        const obj1 = { a: [1, 2], b: { c: [3, 4] } };
        const obj2 = { a: [3, 4], b: { c: [5, 6] } };
        const expected = { a: [1, 2, 3, 4], b: { c: [3, 4, 5, 6] } };
        expect(mergeObjects(obj1, obj2)).to.deep.equal(expected);
    });

    it('should handle empty objects', () => {
        const obj1 = {};
        const obj2 = { a: 1, b: 2 };
        expect(mergeObjects(obj1, obj2)).to.deep.equal(obj2);
        expect(mergeObjects(obj2, obj1)).to.deep.equal(obj2);
    });

    it('should handle null input', () => {
        const obj = { a: 1, b: 2 };
        expect(mergeObjects(null, obj)).to.deep.equal(obj);
        expect(mergeObjects(obj, null)).to.deep.equal(obj);
    });
});

describe('convertToUri', () => {
    describe('Linux/Unix paths', () => {
        it('should convert absolute Linux path to URI', () => {
            const path = '/home/user/project/file.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///home/user/project/file.txt');
        });

        it('should convert relative Linux path to URI', () => {
            const path = 'src/utils/helper.ts';
            const result = convertToUri(path);
            expect(result).to.equal('file:///src/utils/helper.ts');
        });

        it('should handle Linux path with spaces', () => {
            const path = '/home/user/my project/file name.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///home/user/my%20project/file%20name.txt');
        });

        it('should handle Linux path with special characters', () => {
            const path = '/home/user/project/file@#$%.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///home/user/project/file%40%23%24%25.txt');
        });

        it('should handle Linux path with Unicode characters', () => {
            const path = '/home/user/プロジェクト/ファイル.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///home/user/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB.txt');
        });
    });

    describe('Windows paths', () => {
        it('should convert absolute Windows path to URI', () => {
            const path = 'C:\\Users\\User\\project\\file.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///c%3A/Users/User/project/file.txt');
        });

        it('should convert Windows path with forward slashes to URI', () => {
            const path = 'C:/Users/User/project/file.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///c%3A/Users/User/project/file.txt');
        });

        it('should handle Windows path with spaces', () => {
            const path = 'C:\\Program Files\\My App\\file.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///c%3A/Program%20Files/My%20App/file.txt');
        });

        it('should handle different Windows drive letters', () => {
            const pathD = 'D:\\data\\file.txt';
            const pathZ = 'Z:\\backup\\file.txt';
            expect(convertToUri(pathD)).to.equal('file:///d%3A/data/file.txt');
            expect(convertToUri(pathZ)).to.equal('file:///z%3A/backup/file.txt');
        });

        it('should handle Windows relative path', () => {
            const path = 'src\\utils\\helper.ts';
            const result = convertToUri(path);
            expect(result).to.equal('file:///src/utils/helper.ts');
        });
    });

    describe('URI inputs', () => {
        it('should handle file:// URI with triple slash', () => {
            const uri = 'file:///home/user/project/file.txt';
            const result = convertToUri(uri);
            expect(result).to.equal('file:///home/user/project/file.txt');
        });

        it('should handle Windows file:// URI', () => {
            const uri = 'file:///C:/Users/User/project/file.txt';
            const result = convertToUri(uri);
            expect(result).to.equal('file:///c%3A/Users/User/project/file.txt');
        });
    });

    describe('workspace URI joining', () => {
        const workspaceUri = 'file:///home/user/workspace';

        it('should join Linux absolute path with workspace URI', () => {
            const path = '/project/file.txt';
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/project/file.txt');
        });

        it('should join Linux relative path with workspace URI', () => {
            const path = '/src/utils/helper.ts';
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/src/utils/helper.ts');
        });

        it('should join Windows path with workspace URI', () => {
            const path = 'src\\components\\Component.tsx';
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/src/components/Component.tsx');
        });

        it('should join file:// URI with workspace URI', () => {
            const uri = 'file:///project/subfolder/file.txt';
            const result = convertToUri(uri, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/project/subfolder/file.txt');
        });

        it('should handle path normalization when joining', () => {
            const path = 'src/../lib/utils.ts';
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/lib/utils.ts');
        });

        it('should handle multiple slashes when joining', () => {
            const path = 'src//utils///helper.ts';
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/src/utils/helper.ts');
        });

        it('should handle current directory references when joining', () => {
            const path = './src/./utils/helper.ts';
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/workspace/src/utils/helper.ts');
        });

        it('should handle Windows workspace URI', () => {
            const windowsWorkspace = 'file:///C:/Users/User/workspace';
            const path = 'src/file.txt';
            const result = convertToUri(path, true, windowsWorkspace);
            expect(result).to.equal('file:///c%3A/Users/User/workspace/src/file.txt');
        });

        it('should throw error for invalid workspace URI', () => {
            const invalidWorkspace = 'http://example.com/workspace';
            const path = 'src/file.txt';
            expect(() => convertToUri(path, true, invalidWorkspace)).to.throw('workspaceUri must be a file:// URI');
        });
    });

    describe('edge cases', () => {
        it('should handle empty string', () => {
            const path = '';
            const result = convertToUri(path);
            expect(result).to.equal('file:///');
        });

        it('should handle root path', () => {
            const path = '/';
            const result = convertToUri(path);
            expect(result).to.equal('file:///');
        });

        it('should handle Windows root path', () => {
            const path = 'C:\\';
            const result = convertToUri(path);
            expect(result).to.equal('file:///c%3A/');
        });

        it('should handle path with only filename', () => {
            const path = 'file.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///file.txt');
        });

        it('should handle path with dots', () => {
            const path = '/home/user/project/..config';
            const result = convertToUri(path);
            expect(result).to.equal('file:///home/user/project/..config');
        });

        it('should handle mixed slashes', () => {
            const path = '/home\\user/project\\file.txt';
            const result = convertToUri(path);
            expect(result).to.equal('file:///home/user/project/file.txt');
        });

        it('should handle joinWorkspaceURI without workspaceUri', () => {
            const path = '/home/user/file.txt';
            const result = convertToUri(path, true);
            expect(result).to.equal('file:///home/user/file.txt');
        });

        it('should handle joinWorkspaceURI false with workspaceUri', () => {
            const path = '/home/user/file.txt';
            const workspaceUri = 'file:///workspace';
            const result = convertToUri(path, false, workspaceUri);
            expect(result).to.equal('file:///home/user/file.txt');
        });
    });

    describe('path segments joining', () => {
        it('should handle multiple path segments', () => {
            const segments = ['src', 'components', 'ui', 'Button.tsx'];
            const path = segments.join('/');
            const result = convertToUri(path);
            expect(result).to.equal('file:///src/components/ui/Button.tsx');
        });

        it('should handle Windows path segments', () => {
            const segments = ['src', 'components', 'ui', 'Button.tsx'];
            const path = segments.join('\\');
            const result = convertToUri(path);
            expect(result).to.equal('file:///src/components/ui/Button.tsx');
        });

        it('should handle mixed separators in segments', () => {
            const path = 'src/components\\ui/Button.tsx';
            const result = convertToUri(path);
            expect(result).to.equal('file:///src/components/ui/Button.tsx');
        });

        it('should handle segments with workspace joining', () => {
            const workspaceUri = 'file:///home/user/project';
            const segments = ['src', 'lib', 'utils.ts'];
            const path = segments.join('/');
            const result = convertToUri(path, true, workspaceUri);
            expect(result).to.equal('file:///home/user/project/src/lib/utils.ts');
        });

        it('should handle deep nested segments', () => {
            const segments = ['very', 'deep', 'nested', 'folder', 'structure', 'file.txt'];
            const path = segments.join('/');
            const result = convertToUri(path);
            expect(result).to.equal('file:///very/deep/nested/folder/structure/file.txt');
        });
    });
});