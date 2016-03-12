import { A }    from 'classy';
import { Game } from './game.shared';
import { Rank } from './rank.shared';
import { User } from './user.shared';

A(User).has.many('suggestions')
    .but.a(Game).has.one('suggester');
A(User).has.many('rankings')
    .but.a(Rank).has.one('ranker');
A(Game).has.many('rankings')
    .but.a(Rank).has.one('game');

export let BrashShmoesModel = {
    games : Game,
    ranks : Rank,
    users : User
};