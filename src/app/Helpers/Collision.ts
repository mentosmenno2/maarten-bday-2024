import { AbstractGameObject } from '../GameObjects/AbstractGameObject.js';
import { Position } from '../Position.js';

export class Collision {
	public static gameObjectAndPositionCollide(
		position: Position,
		gameObject: AbstractGameObject,
	): boolean {
		return (
			position.getX() >= gameObject.getX() &&
			position.getX() <= gameObject.getX() + gameObject.getWidth() &&
			position.getY() >= gameObject.getY() &&
			position.getY() <= gameObject.getY() + gameObject.getHeight()
		);
	}

	public static gameObjectsCollide(
		gameObject1: AbstractGameObject,
		gameObject2: AbstractGameObject,
	): boolean {
		return !(
			gameObject1.getX() + gameObject1.getWidth() < gameObject2.getX() ||
			gameObject1.getX() > gameObject2.getX() + gameObject2.getWidth() ||
			gameObject1.getY() + gameObject1.getHeight() < gameObject2.getY() ||
			gameObject1.getY() > gameObject2.getY() + gameObject2.getHeight()
		);
	}
}
