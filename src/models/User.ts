import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    telephone: string

    @Column()
    email: string

    @Column()
    senha: string

}