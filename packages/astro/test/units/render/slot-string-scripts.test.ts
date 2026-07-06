import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { SlotString } from '../../../dist/runtime/server/render/slot.js';
import { createRenderInstruction } from '../../../dist/runtime/server/render/instruction.js';

describe('SlotString', () => {
	it('toString() includes script content from chunks', () => {
		// Simulate what renderSlotToString produces when a component has a <script>:
		// - chunks contains string parts and script instructions
		// - content should also include the script HTML
		const scriptInstruction = createRenderInstruction({
			type: 'script',
			id: 'test-script',
			content: '<script type="module" src="/test.js"></script>',
		});

		const slot = new SlotString(
			'<p>before</p><script type="module" src="/test.js"></script><p>after</p>',
			null,
			['<p>before</p>', scriptInstruction, '<p>after</p>'],
		);

		const str = slot.toString();
		assert.ok(
			str.includes('<script type="module" src="/test.js"></script>'),
			`toString() should include script content, got: ${str}`,
		);
		assert.ok(
			str.includes('<p>before</p>'),
			'toString() should include content before script',
		);
		assert.ok(
			str.includes('<p>after</p>'),
			'toString() should include content after script',
		);
	});

	it('toString() works when there are no scripts', () => {
		const slot = new SlotString(
			'<p>hello</p>',
			null,
			['<p>hello</p>'],
		);

		assert.equal(slot.toString(), '<p>hello</p>');
	});

	it('toString() works with empty chunks', () => {
		const slot = new SlotString('<p>hello</p>', null, []);
		assert.equal(slot.toString(), '<p>hello</p>');
	});
});
