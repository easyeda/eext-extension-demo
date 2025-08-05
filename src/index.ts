/**
 * 入口文件
 *
 * 本文件为默认扩展入口文件，如果你想要配置其它文件作为入口文件，
 * 请修改 `extension.json` 中的 `entry` 字段；
 *
 * 请在此处使用 `export`  导出所有你希望在 `headerMenus` 中引用的方法，
 * 方法通过方法名与 `headerMenus` 关联。
 *
 * 如需了解更多开发细节，请阅读：
 * https://prodocs.lceda.cn/cn/api/guide/
 */
import * as extensionConfig from '../extension.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function activate(status?: 'onStartupFinished', arg?: string): void { }

export function about(): void {
	eda.sys_Dialog.showInformationMessage(
		eda.sys_I18n.text('EasyEDA extension SDK v', undefined, undefined, extensionConfig.version),
		eda.sys_I18n.text('About'),
	);
}

function getRandomInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 重新随机分配位号
 */
export async function randomAllocateDesignatesForPCB(): Promise<void> {
	const allComponents = await eda.pcb_PrimitiveComponent.getAll();
	for (const component of allComponents) {
		const primitiveId = component.getState_PrimitiveId();
		const property = {
			designator: 'D' + getRandomInt(1, 1000),
		};
		await eda.pcb_PrimitiveComponent.modify(primitiveId, property);
	}
}

/**
 * 批量添加元件属性
 */
export async function batchAddComponentAttributesForPCB(): Promise<void> {
	await eda.sys_IFrame.openIFrame('/iframe/batchAddComponentAttrDialogForPCB.html', 250, 135, 'batchAddComponentForPCB');
}

/**
 * 批量放置文本
 */
export async function batchPlacementTextForPCB(): Promise<void> {
	await eda.sys_IFrame.openIFrame('/iframe/batchPlacementTextDialogForPCB.html', 260, 130, 'batchPlacementTextDialogForPCB');
}

/**
 * 删除图元
 */
export async function deletePrimitivesForPCB(): Promise<void> {
	await eda.sys_IFrame.openIFrame('/iframe/deletePrimitivesDialogForPCB.html', 125, 226, 'deletePrimitivesDialogForPCB');
}

/**
 * 图元统计
 */
export async function statisticalPrimitivesForPCB(): Promise<void> {
	const componentNum = await eda.pcb_PrimitiveComponent.getAll();
	const lineTrackNum = await eda.pcb_PrimitiveLine.getAll();
	const arcTrackNum = await eda.pcb_PrimitiveArc.getAll();
	const trackNum = lineTrackNum.length + arcTrackNum.length;
	const padNum = await eda.pcb_PrimitivePad.getAll();
	const viaNum = await eda.pcb_PrimitiveVia.getAll();
	const pourNum = await eda.pcb_PrimitivePour.getAll();
	const fillNum = (await eda.pcb_PrimitiveFill.getAll())?.filter((item) => item.getState_Net() !== null);
	const lineNum = (await eda.pcb_PrimitivePolyline.getAll())?.filter((item) => item.getState_Layer() !== 11);
	const textNum = await eda.pcb_PrimitiveString.getAll();
	eda.sys_Dialog.showInformationMessage(
		eda.sys_I18n.text(
			'Component: Track: Pad: Via: Pour: Fill: Line: Text:',
			undefined,
			undefined,
			componentNum.length,
			trackNum,
			padNum.length,
			viaNum.length,
			pourNum.length,
			fillNum.length,
			lineNum.length,
			textNum.length
		),
		eda.sys_I18n.text('Primitive Statistics'),
	);
}

/**
 * ***************************************************************上面是PCB**********************
 * ***************************************************************下面是SCH**********************
 */

/**
 * 重新随机分配位号
 */
export async function randomAllocateDesignatesForSCH(): Promise<void> {
	const allComponents = (await eda.sch_PrimitiveComponent.getAll())?.filter(
		(item) => item.getState_ComponentType() === ESCH_PrimitiveComponentType.COMPONENT,
	);
	for (const component of allComponents) {
		const primitiveId = component.getState_PrimitiveId();
		const property = {
			designator: 'D' + getRandomInt(1, 1000),
		};
		await eda.sch_PrimitiveComponent.modify(primitiveId, property);
	}
}

/**
 * 批量添加元件属性
 */
export async function batchAddComponentAttributesForSCH(): Promise<void> {
	await eda.sys_IFrame.openIFrame('/iframe/batchAddComponentAttrDialogForSCH.html', 260, 135, 'batchAddComponentAttrDialogForSCH');
}

/**
 * 批量放置文本
 */
export async function batchPlacementTextForSCH(): Promise<void> {
	await eda.sys_IFrame.openIFrame('/iframe/batchPlacementTextDialogForSCH.html', 260, 130, 'batchPlacementTextDialogForSCH');
}

/**
 * 删除图元
 */
export async function deletePrimitivesForSCH(): Promise<void> {
	await eda.sys_IFrame.openIFrame('/iframe/deletePrimitivesDialogForSCH.html', 125, 150, 'deletePrimitivesDialogForSCH');
}

/**
 * 图元统计
 */
export async function statisticalPrimitivesForSCH(): Promise<void> {
	const componentNum = (await eda.sch_PrimitiveComponent?.getAll())?.filter(
		(item) => item.getState_ComponentType() === ESCH_PrimitiveComponentType.COMPONENT,
	);
	const portNum = (await eda.sch_PrimitiveComponent?.getAll())?.filter(
		(item) => item.getState_ComponentType() === ESCH_PrimitiveComponentType.NET_PORT,
	);
	const textNum = await eda.sch_PrimitiveText?.getAll();
	const wireNum = await eda.sch_PrimitiveWire?.getAll();
	eda.sys_Dialog.showInformationMessage(
		eda.sys_I18n.text('Component: Port: Text: Wire:', undefined, undefined, componentNum.length, portNum.length, textNum.length, wireNum.length),
		eda.sys_I18n.text('Primitive Statistics'),
	);
}
