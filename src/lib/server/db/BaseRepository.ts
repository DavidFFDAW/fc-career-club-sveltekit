// src/repositories/baseRepository.ts
import prisma from './prisma';
import { PrismaClient } from '@prisma/client';
import type { EntityWithId } from '$lib/types/interfaces';

export class BaseRepository<
	T extends EntityWithId,
	CreateInput,
	UpdateInput,
	WhereUniqueInput,
	FindManyArgs
> {
	protected prisma: PrismaClient;
	protected model: any; // Aquí guardaremos la referencia al cliente del modelo de Prisma

	constructor(modelName: keyof PrismaClient) {
		this.prisma = prisma;
		// Asegurarse de que el modelo existe en el cliente de Prisma
		if (typeof this.prisma[modelName] === 'object') {
			this.model = this.prisma[modelName];
		} else {
			throw new Error(`Model ${String(modelName)} not found in Prisma client.`);
		}
	}

	get(args?: FindManyArgs): Promise<T[]> {
		return this.model.findMany(args);
	}

	getBySlug(slug: string): Promise<T | null> {
		return this.model.findUnique({
			where: { slug }
		});
	}

	paginate(
		page: number,
		args?: FindManyArgs
	): Promise<[number, T[]]> {
		const take = 15;
		const prepage = page < 1 ? 1 : page;
		const skip = (prepage - 1) * take;

		return Promise.all([
			this.model.count(args),
			this.model.findMany({
				...args,
				take,
				skip
			})
		]);
	}

	unique(where: WhereUniqueInput): Promise<T | null> {
		return this.model.findUnique({ where });
	}

	create(data: CreateInput): Promise<T> {
		return this.model.create({ data });
	}

	update(where: WhereUniqueInput, data: UpdateInput): Promise<T> {
		return this.model.update({ where, data });
	}

	delete(where: WhereUniqueInput): Promise<T> {
		return this.model.delete({ where });
	}

	truncate(): Promise<number> {
		return this.prisma.$executeRaw`TRUNCATE TABLE ${this.model._meta.name};`;
	}
}
