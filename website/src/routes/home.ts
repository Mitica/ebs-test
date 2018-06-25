
import { Router, Request, Response } from 'express';
import { ApiUser } from '../api/api-user';

const router: Router = Router();

//index

router.get('/', function (req: Request, res: Response) {
    const user = req.user as ApiUser;
    // req.isAuthenticated()
    if (!user) {
        return res.redirect('/login');
    }
    
    res.locals.user = user;
    res.locals.page = {
        title: 'Articles'
    }

    res.render('articles');
});

router.get('/admin', function (req: Request, res: Response) {
    const user = req.user as ApiUser;

    if (!user) {
        return res.redirect('/login');
    }
    // if (!user || user.role !== 'admin') {
    //     return res.redirect('/login');
    // }

    res.locals.user = user;
    res.locals.page = {
        title: 'Admin'
    }

    res.render('admin');
});

export default router;
