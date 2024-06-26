import * as React from "react";
import { ContextMenu, Menu, MenuDivider, MenuItem, Tag } from "@blueprintjs/core";

import { Mesh } from "babylonjs";

import { Editor } from "../../editor";

import { Tools } from "../../tools/tools";

export class GraphReferenceUpdater {
	private _mesh: Mesh;
	private _editor: Editor;

	/**
	 * Constructor.
	 * @param editor defines the reference to the editor.
	 * @param mesh defines the reference to the mesh that has waiting references to update.
	 */
	public constructor(editor: Editor, mesh: Mesh) {
		this._mesh = mesh;
		this._editor = editor;
	}

	/**
	 * Shows the context menu of the reference updater.
	 */
	public showContextMenu(ev: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
		const metadata = Tools.GetMeshMetadata(this._mesh);

		ContextMenu.show((
			<Menu>
				<Tag>Changes available from source file</Tag>
				<MenuItem text="Update Geometry" disabled={(metadata._waitingUpdatedReferences?.geometry ?? null) === null} onClick={() => this._updateGeometry(false)} />
				<MenuItem text="Update Geometry With Skeleton" disabled={(metadata._waitingUpdatedReferences?.geometry ?? null) === null} onClick={() => this._updateGeometry(true)} />
				<MenuItem text="Update Material" disabled={(metadata._waitingUpdatedReferences?.material ?? null) === null} onClick={() => this._updateMaterial()} />
				<MenuDivider />
				<MenuItem text="Update All" onClick={() => this._updateAll()} />
				<MenuDivider />
				<MenuItem text="Done" intent="success" onClick={() => this._handleDoneClicked()} />
			</Menu>
		), {
			top: ev.clientY,
			left: ev.clientX,
		});
	}

	/**
	 * Called on the user wants to update all updated references.
	 */
	private _updateAll(): void {
		this._updateGeometry(false);
		this._updateMaterial();
	}

	/**
	 * Called on the user wants to update the geometry of the mesh.
	 */
	private _updateGeometry(withSkeleton: boolean): void {
		const metadata = Tools.GetMeshMetadata(this._mesh);
		metadata._waitingUpdatedReferences?.geometry?.handler?.(this._mesh, withSkeleton);

		this._editor.graph.refresh();
	}

	/**
	 * Called on the user wants to update the material of the mesh.
	 */
	private _updateMaterial(): void {
		const metadata = Tools.GetMeshMetadata(this._mesh);
		metadata._waitingUpdatedReferences?.material?.handler?.(this._mesh);

		this._editor.graph.refresh();
	}

	/**
	 * Called on the user clicks on the done button.
	 */
	private _handleDoneClicked(): void {
		if (this._mesh.metadata?._waitingUpdatedReferences) {
			delete this._mesh.metadata._waitingUpdatedReferences;
		}

		this._editor.graph.refresh();
	}
}
