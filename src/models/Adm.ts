import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('adms')
export default class Adm {
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